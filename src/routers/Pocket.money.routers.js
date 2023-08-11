const express = require("express");
const router = express.Router();

const pocketMoney = require('../controllers/master/Pocket.money.controller')

router.get("/", pocketMoney.getDataMulti)
router.get("/:id", pocketMoney.getData)
router.post("/", pocketMoney.postData)
router.put("/:id", pocketMoney.updateData)
router.delete("/:id", pocketMoney.deleteData)

module.exports = router;