const Sequelize = require("sequelize");
require("../database/connection");
module.exports = sequelize.define("request", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_receiver: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: "0"
    },
    name_sender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    skill: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    coordinates: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "0"
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    }
});