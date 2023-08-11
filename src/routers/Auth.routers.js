const express = require("express");
const router = express.Router();

const auth = require('./../controllers/auth/Auth.controller')

router.post("/login", auth.AuthLogin)

module.exports = router;