const User = require("../models/user");
const Review = require("../models/review");
const Skill = require("../models/skill");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const Connect = require("../database/connection");

exports.user_signUp = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const description = req.body.description;
    const id_company = req.body.id_company;
    const id_skill = req.body.id_skill;

    User.findAll({ where: { email: email }, raw: true })
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        User.create({
                            name: name,
                            email: email,
                            password: hash,
                            description: description,
                            id_company: id_company,
                            id_skill: id_skill

                        }).then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: "User created!",
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({ error: err });
                        });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

exports.user_login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findAll({ where: { email: email }, raw: true })
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({ user }, "secret", { expiresIn: '1h' });
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        id: user[0].id,
                        name: user[0].name,
                        email: user[0].email,
                        description: user[0].description,
                        rating: user[0].rating,
                        balance: user[0].balance,
                        coordinates: user[0].coordinates,
                        id_company: user[0].id_company,
                        id_skill: user[0].id_skill
                    })
                }
                res.status(401).json({
                    message: "Auth failed"
                })
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.user_getProfile = (req, res, next) => {
    const id = req.params.id;
    User.findByPk(id)
        .then((user) => {
            console.log(user);
            Review.findAll({ where: { id_user: id }, raw: true })
                .then(reviews => {
                    Skill.findByPk(user.id_skill)
                        .then(skill => {
                            res.status(200).json({
                                message: "User found",
                                user: user,
                                reviews: reviews,
                                skill: skill.title
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(500).json({ error: err });
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.user_getAll = (req, res, next) => {
    let query = `SELECT * FROM Users
                JOIN Skills ON Skills.id = Users.id_skill;`;

    Connect.query(query, function(err, results) {
            if (err) console.log(err);
        })
        .then(result => {
            res.status(200).json({
                message: "All users",
                users: result[0]
            });
        })


    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}