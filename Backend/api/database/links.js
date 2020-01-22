const Sequelize = require("sequelize");
const User = require('../models/user');
const Company = require('../models/company');
const Skill = require('../models/skill');
const Review = require('../models/review');
const Request = require('../models/request');
const Gift = require('../models/gift');

module.exports = () => {
    User.hasMany(Review, { onDelete: "cascade", foreignKey: 'id_user' });
    User.hasMany(Request, { onDelete: "cascade", foreignKey: 'id_sender' });
    Company.hasMany(User, { onDelete: "cascade", foreignKey: 'id_company' });
    Company.hasMany(Gift, { onDelete: "cascade", foreignKey: 'id_company' });
    Skill.hasMany(User, { onDelete: "cascade", foreignKey: 'id_skill' });
}