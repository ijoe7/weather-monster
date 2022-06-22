const Sequelize = require("sequelize");
const db = require("../config/database");

const Temperature = db.define("temperature", {
    id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    max: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    min: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cityId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
    }
},
    {
        timestamps: true
    }
);

module.exports = Temperature;