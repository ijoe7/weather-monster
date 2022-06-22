const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const config = require("./config.json");

let database = config.development.database;
let username = config.development.username;
let password = config.development.password;
if (process.env.NODE_ENV === "test") {
  database = config.test.database;
}
const db = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;