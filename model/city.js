const Sequelize = require("sequelize");
const db = require("../config/database");

const City = db.define("city", {
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    latitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
    }
},
    {
        timestamps: false
    }
);

module.exports = City;