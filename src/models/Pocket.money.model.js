const Sequelize = require("sequelize");
const { Db } = require("../config/database.config")

const PocketMoneyModel = Db.define("pocket_money", {
    id: {
        type: Sequelize.STRING,
        max: 50,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4, 
        field: 'id'
    },
    type: {
        type: Sequelize.ENUM('in_province', 'out_province', 'in_island', 'out_country'),
        allowNull: false,
        field: 'type'
    },
    currency: {
        type: Sequelize.STRING,
        field: 'currency'
    },
    distance: {
        type: Sequelize.INTEGER,
        field: 'distance'
    },
    nominal: {
        type: Sequelize.INTEGER,
        field: 'nominal'
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true,
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

module.exports = PocketMoneyModel;