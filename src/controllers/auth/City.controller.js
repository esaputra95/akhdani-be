const UserModel = require('../models/User.model')

const getData = async (req, res) => {
    try {
        const data = await UserModel.findAll({where: {
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

module.exports = { 
    getData, 
    getDataMulti, 
    postData, 
    updateData, 
    deleteData
}