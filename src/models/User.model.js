const Sequelize = require("sequelize");
const { Db } = require("../config/database.config")

const UserModel = Db.define("users", {
    id: {
        type: Sequelize.STRING,
        max: 50,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: Sequelize.UUIDV4, 
        field: 'id'
    },
    name: {
        type: Sequelize.STRING,
        max: 100,
        allowNull: false,
        field: 'name',
        validate: {
            notEmpty: true,
        }
    },
    role: {
        type: Sequelize.ENUM('Admin', 'employee'),
        max: '10',
        defaultValue: 'employee',
        field: 'role'
    },
    username: {
        type: Sequelize.STRING,
        max: 255,
        allowNull: false,
        field: 'username',
        unique: true,
        validate: {
            notEmpty: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        max: 255,
        defaultValue: null,
        field: 'password',
        validate: {
            notEmpty: true,
        }
    },
    token: {
        type: Sequelize.STRING,
        defaultValue: null,
        field: 'token'
    },
    status: {
        type: Sequelize.INTEGER,
        max: 1,
        defaultValue: 1,
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

module.exports = UserModel;