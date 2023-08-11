const UserModel = require("../../models/User.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../../config/env.config')

const AuthLogin = async (req, res) => {
    try {
        const User = await UserModel.findAll({
            where: {
                username : req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, User[0].password);
        if(!match) return res.status(401).json({message: "Wrong username or password"});
        const id = User[0].id
        const username = User[0].username;
        const name = User[0].name;
        const levelAccess = User[0].role;
        const accessToken = jwt.sign({id, username, name, levelAccess}, ACCESS_TOKEN_SECRET,{
            expiresIn : '30d'
        });

        res.json({token: accessToken})
        
    } catch (error) {
        res.status(404).json({message: "Username not exist"})
    }
}

module.exports = { AuthLogin }