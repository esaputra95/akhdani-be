const express = require("express");
const router = express.Router();

const perdins = require('../controllers/activity/Perdin.controller')

router.get("/", perdins.getDataMulti)
router.get("/:id", perdins.getData)
router.post("/", perdins.postData)
router.post("/approve", perdins.approve)
router.put("/:id", perdins.updateData)
router.delete("/:id", perdins.deleteData)

module.exports = router;