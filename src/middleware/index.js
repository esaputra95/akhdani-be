const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET} = require('./../config/env.config')

const accessToken = function(req, res, next){
    const authHeader = req.headers['authorization'];
    if(authHeader===undefined) return res.send(403);
    const token = authHeader.split(" ")[1];
    if(token==null) return res.send(401);
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded)=>{
        console.log(decoded);
        if(err) return res.send(403);
        res.locals.userId = decoded.id
        res.locals.role = decoded.levelAccess
        next()
    })
}

module.exports = { accessToken };