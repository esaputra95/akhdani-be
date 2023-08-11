const Sequelize = require("sequelize");
const { Db } = require("../config/database.config")
const UserModel = require('./User.model')

const PerdinModel = Db.define("perdin", {
    id: {
        type: Sequelize.STRING,
        max: 36,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4, 
        field: 'id'
    },
    userId: {
        type: Sequelize.STRING,
        max: 36,
        field: 'userId'
    },
    goDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'goDate'
    },
    returnDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'returnDate'
    },
    originCity: {
        type: Sequelize.JSON,
        allowNull: false,
        field: 'originCity'
    },
    destinationCity: {
        type: Sequelize.JSON,
        allowNull: false,
        field: 'destinationCity'
    },
    distance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'distance'
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'currency'
    },
    pocketMoney: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'pocketMoney'
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'description'
    },
    status: {
        type: Sequelize.ENUM('approve', 'reject', 'submit'),
        field: 'status'
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: null,
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true,
        field: 'updatedAt'
    }
}, {
    freezeTableName: true,
    timestamps: true,
})
PerdinModel.belongsTo(UserModel)
module.exports = PerdinModel;