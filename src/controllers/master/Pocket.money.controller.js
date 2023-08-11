const { Op } = require('sequelize');
const PocketMoneyModel = require('./../../models/Pocket.money.model')

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
        params.type ? query = [ ...query, {type: {[ Op.substring]: params.type }} ] : null;
        params.currency ? query = [ ...query, {currency: { [ Op.substring]: params.currency }} ]: null;
        
        const data = await PocketMoneyModel.findAll({
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
        const count = await PocketMoneyModel.count({
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
        const data = await PocketMoneyModel.findOne({where: {
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
        const checkType = await PocketMoneyModel.findOne({
            where: {
                type: req.body.type
            }
        })
        if(checkType) throw new Error('Jenis Uang saku sudah terdaftar, tidak dibenarkan membuat lebih dari satu pengaturan jenis uang saku')
        const model = await PocketMoneyModel.create({ ...req.body})
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
        await PocketMoneyModel.update(req.body, {
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
        await PocketMoneyModel.destroy({where: {
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