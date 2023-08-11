const { Op } = require('sequelize');
const UserModel = require('../../models/User.model')
const bcrypt = require('bcrypt');

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

        const data = await UserModel.findAll({
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
        const count = await UserModel.count({
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
        const data = await UserModel.findOne({where: {
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
        const salt = await bcrypt.genSalt();
        const newPass = await bcrypt.hash(req.body.password, salt);
        const model = await UserModel.create({ ...req.body, password: newPass })
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
        await UserModel.update(req.body, {
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
        await UserModel.destroy({where: {
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