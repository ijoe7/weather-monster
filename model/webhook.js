const Sequelize = require("sequelize");
const db = require("../config/database");

const Webhook = db.define("webhook", {
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    callback_url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cityId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
    }
},
    {
        timestamps: false
    }
);

module.exports = Webhook;