const Sequelize = require("sequelize");
const { Db } = require("../config/database.config")

const CityModel = Db.define("city", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    label: {
        type: Sequelize.STRING,
        max: 255,
        allowNull: false,
        field: 'label',
    },
    latitude: {
        type: Sequelize.STRING,
        max: 25,
        allowNull: false,
        field: 'latitude',
    },
    longitude: {
        type: Sequelize.STRING,
        max: 25,
        allowNull: false,
        field: 'longitude',
    },
    province: {
        type: Sequelize.STRING,
        max: 255,
        allowNull: false,
        field: 'province',
    },
    island: {
        type: Sequelize.STRING,
        max: 255,
        allowNull: false,
        field: 'island',
    },
    country: {
        type: Sequelize.STRING,
        max: 255,
        allowNull: false,
        field: 'country',
    }
}, {
    freezeTableName: true,
    timestamps: false,
})

module.exports = CityModel;