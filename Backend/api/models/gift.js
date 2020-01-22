const Sequelize = require("sequelize");
require("../database/connection");
module.exports = sequelize.define("gift", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
});