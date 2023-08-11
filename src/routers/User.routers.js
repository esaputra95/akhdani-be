const express = require("express");
const router = express.Router();

const users = require('./../controllers/master/User.controller')

router.get("/", users.getDataMulti)
router.get("/:id", users.getData)
router.post("/", users.postData)
router.put("/:id", users.updateData)
router.delete("/:id", users.deleteData)

module.exports = router;