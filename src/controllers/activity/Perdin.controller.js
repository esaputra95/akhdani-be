const moment = require('moment/moment')
const PerdinModel = require('../../models/Perdin.model')
const PocketMoneyModel = require('../../models/Pocket.money.model')
const dataCity = require('./../../data/index')
const UserModel = require('./../../models/User.model')
const CityModel = require('./../../models/City.model')
const { Op } = require('sequelize')

const getDataMulti = async (req, res) => {
    try {
        let params = req.query;
        let setPage = params.page?parseInt(params.page):1;
        let limit = params.limit?parseInt(params.limit):10;
        let setOffset = (setPage-1)*limit;
        let sort = params.sort??'asc';
        let sortfield = params.sortfield??'type'

        // QUERY
        let query=[];
        params.name ? query = [ ...query, {name: {[ Op.substring]: params.name }} ] : null;
        params.username ? query = [ ...query, {username: { [ Op.substring]: params.username }} ]: null;
        console.log(res.locals.userId);
        console.log(res.locals.role);
        if(res.locals.role==="employee"){
            query = [...query,
                {userId: res.locals.userId}
            ]
        }

        const data = await PerdinModel.findAll({
            where: {
                [Op.and] : [
                    ...query
                ]
            },
            offset: setOffset,
            limit: limit,
            order:[
                [sortfield, sort]
            ]
        })
        const count = await PerdinModel.count({
            where: {
                [Op.and] : [
                    ...query
                ]
            },
            offset: setOffset,
            limit: limit,
            order:[
                [sortfield, sort]
            ]
        })
        res.status(200).json({
            message: "success Get Data Perdin",
            data: data,
            total: count
        })
    } catch (error) {
        res.status(500).json({
            message: `${error}`,
            data: null
        })
    }
}

const getData = async (req, res) => {
    try {
        const data = await PerdinModel.findOne({where: {
            id: req.params.id
        }, include: {
            model : UserModel,
            attributes: [
                'name'
            ]
        }})
        res.status(200).json({
            message: "success Get Data Perdin",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: `${error}`,
            data: null
        })
    }
}

const postData = async (req, res) => {
    try {
        let pocketMoney=0
        let currency=''
        const goDate = req.body.goDate;
        const returnDate = req.body.returnDate;
        const originCity = await CityModel.findOne({
            where: {
                id : req.body.originCity
            }
        });
        const destinationCity = await CityModel.findOne({
            where: {
                id : req.body.destinationCity
            }
        });
        const distance  = await getDistance(parseFloat(originCity.latitude), parseFloat(originCity.longitude), parseFloat(destinationCity.latitude), parseFloat(destinationCity.longitude), 'K')
        const getpocket = await getPocketMoney(originCity, destinationCity)
        const duration = moment.duration(moment(returnDate).diff(moment(goDate))).asDays();
        if(distance>=getpocket.distance){
            pocketMoney = duration * getpocket.nominal
            currency = getpocket.currency
        }
        const model = await PerdinModel.create(
            { ...req.body, 
                originCity: originCity, 
                destinationCity: destinationCity,
                distance: distance,
                pocketMoney: pocketMoney,
                currency: currency,
                userId: res.locals.userId
            })
        res.status(200).json({
            message: "success Create Data Perdin",
            data: model
        })
    } catch (error) {
        res.status(500).json({
            message: `${error}`,
            data: []
        })
    }
}

const updateData = async (req, res) => {
    try {
        let pocketMoney=0
        let currency=''
        const goDate = req.body.goDate;
        const returnDate = req.body.returnDate;
        const originCity = await CityModel.findOne({
            where: {
                id : req.body.originCity
            }
        });
        const destinationCity = await CityModel.findOne({
            where: {
                id : req.body.destinationCity
            }
        });
        const distance  = await getDistance(parseFloat(originCity.latitude), parseFloat(originCity.longitude), parseFloat(destinationCity.latitude), parseFloat(destinationCity.longitude), 'K')
        const getpocket = await getPocketMoney(originCity, destinationCity)
        const duration = moment.duration(moment(returnDate).diff(moment(goDate))).asDays();
        if(distance>=getpocket.distance){
            pocketMoney = duration * getpocket.nominal
            currency = getpocket.currency
        }
        await PerdinModel.update({
            ...req.body,
            originCity: originCity,
            destinationCity: destinationCity,
            currency: currency,
            duration: duration,
            pocketMoney: pocketMoney
        }, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "success Update Data Perdin",
            data: req.params.id
        })
    } catch (error) {
        res.status(500).json({
            message: `${error}`,
            data: []
        })
    }
}

const deleteData = async (req, res) => {
    try {
        await PerdinModel.destroy({where: {
            id: req.params.id
        }})
        res.status(200).json({
            message: "success Delete Data Perdin",
            data: []
        })
    } catch (error) {
        res.status(500).json({
            message: `${error}`,
            data: []
        })
    }
}

const approve = async (req, res) => {
    try {
        await PerdinModel.update({
            status: req.body.action
        }, {
            where: {
                id: req.body.id
            }
        })
        res.status(200).json({
            message: "success Approve Data Perdin",
            data: []
        })
    } catch (error) {
        res.status(500).json({
            message: `${error}`,
            data: []
        })
    }
}

const getDistance = async (lat1, lon1, lat2, lon2, unit) => {
    console.log({lat1});
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

const getPocketMoney = async (originCity, destinationCity) => {
    try {
        if(originCity.country !== destinationCity.country){
            // BEDA NEGARA
            const data = await PocketMoneyModel.findOne({
                where: {
                    type: 'out_country'
                }
            })
            if(data){
                return {
                    currency : data.currency, 
                    nominal: data.nominal,
                    distance: data.distance
                }
            }
        }
        if(originCity.island !== destinationCity.island){
            // BEDA NEGARA
            const data = await PocketMoneyModel.findOne({
                where: {
                    type: 'in_country'
                }
            })
            if(data){
                return {
                    currency : data.currency, 
                    nominal: data.nominal,
                    distance: data.distance
                }
            }
        }
        if(originCity.province !== destinationCity.province){
            // BEDA NEGARA
            const data = await PocketMoneyModel.findOne({
                where: {
                    type: 'in_island'
                }
            })
            if(data){
                return {
                    currency : data.currency, 
                    nominal: data.nominal,
                    distance: data.distance
                }
            }
        }
        if(originCity.province === destinationCity.province){
            // BEDA NEGARA
            const data = await PocketMoneyModel.findOne({
                where: {
                    type: 'in_province'
                }
            })
            if(data){
                return {
                    currency : data.currency, 
                    nominal: data.nominal,
                    distance: data.distance
                }
            }
        }
    } catch (error) {
        return {
            currency: null,
            nominal: 0
        }
    }
}

module.exports = { 
    getData, 
    getDataMulti, 
    postData, 
    updateData, 
    deleteData,
    approve
}