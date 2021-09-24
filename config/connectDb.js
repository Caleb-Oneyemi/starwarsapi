const { Sequelize } = require('sequelize');

const db = process.env.PG_DB;
const user = process.env.PG_USER;
const pass = process.env.PG_PASS

const sequelize = new Sequelize(db, user, pass, {
  host: 'db',
  dialect: 'postgres'
});

module.exports = {
  sequelize
};