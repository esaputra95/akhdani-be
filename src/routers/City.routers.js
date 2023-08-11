const express = require("express");
const router = express.Router();

const city = require('../controllers/master/City.controller')

router.get("/", city.getDataMulti)
router.get("/:id", city.getData)
router.post("/", city.postData)
router.put("/:id", city.updateData)
router.delete("/:id", city.deleteData)

module.exports = router;