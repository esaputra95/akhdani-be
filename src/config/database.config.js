const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DIALEC, DB_HOST } = require('./env.config')

// CONNNECT TO DB               
const Db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql', 
  port: DB_PORT,
  define: {
    timestamps: false
  },  
  timezone: "+07:00",
  logging: false
});

module.exports = { Db, Op} ;