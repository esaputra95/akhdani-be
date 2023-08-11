const { Op } = require('sequelize');
const CityModel = require('../../models/City.model')

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
        params.label ? query = [ ...query, {label: {[ Op.substring]: params.label }} ] : null;
        params.province ? query = [ ...query, {province: { [ Op.substring]: params.province }} ]: null;
        params.island ? query = [ ...query, {island: { [ Op.substring]: params.island }} ]: null;

        const data = await CityModel.findAll({
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
        const count = await CityModel.count({
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
            message: "success Get Data User",
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
        const data = await CityModel.findOne({where: {
            id: req.params.id
        }})
        res.status(200).json({
            message: "success Get Data User",
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
        const model = await CityModel.create({ ...req.body})
        res.status(200).json({
            message: "success Create Data User",
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
        if(!req.body.password){
            delete req.body.password
        }else{
            
        }
        await CityModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "success Update Data User",
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
        await CityModel.destroy({where: {
            id: req.params.id
        }})
        res.status(200).json({
            message: "success Delete Data User",
            data: []
        })
    } catch (error) {
        res.status(500).json({
            message: `${error}`,
            data: []
        })
    }
}

module.exports = { 
    getData, 
    getDataMulti, 
    postData, 
    updateData, 
    deleteData
}