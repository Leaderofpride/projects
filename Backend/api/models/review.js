const Sequelize = require("sequelize");
require("../database/connection");
module.exports = sequelize.define("review", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_author: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name_author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    }
});