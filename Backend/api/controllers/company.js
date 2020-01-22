const Company = require("../models/company");
const User = require("../models/user");
const Sequelize = require("sequelize");
const Gift = require("../models/gift");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const Connect = require("../database/connection");

exports.company_signUp = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const description = req.body.description;
    const link = req.body.link;

    Company.findAll({ where: { email: email }, raw: true })
        .then(company => {
            if (company.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        Company.create({
                            name: name,
                            email: email,
                            password: hash,
                            description: description,
                            link: link

                        }).then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: "Company created!",
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

exports.company_login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Company.findAll({ where: { email: email }, raw: true })
        .then(company => {
            if (company.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(password, company[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({ company }, "secret", { expiresIn: '1h' });
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        id: company[0].id,
                        name: company[0].name,
                        email: company[0].email,
                        description: company[0].description,
                        link: company[0].link,
                        rating: company[0].rating,
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

exports.company_getProfile = (req, res, next) => {
    const id = req.params.id;
    var sum = 0;
    var sumid = 0;
    var Op = Sequelize.Op;

    User.findAll({ raw: true })
        .then(users => {
            for (var i = 0; i < users.length; i++) {
                sum = sum + users[i].rating;
            }
            User.findAll({ where: { id_company: id }, raw: true })
                .then(usersid => {
                    for (var i = 0; i < usersid.length; i++) {
                        sumid = sumid + usersid[i].rating;
                    }
                    Company.update({ rating: sumid / sum * 100 }, { where: { id: id } })
                        .then(() => {
                            Company.findAll({ where: { id: id }, raw: true })
                                .then(companies => {
                                    User.findAll({
                                            where: {
                                                id_company: id,
                                                balance: {
                                                    [Op.gt]: 0
                                                }
                                            },
                                            raw: true
                                        })
                                        .then(userup => {
                                            Gift.findAll({ where: { id_company: id }, raw: true })
                                                .then(gifts => {
                                                    res.status(200).json({
                                                        company: companies[0],
                                                        userofcompany: usersid,
                                                        userup: userup,
                                                        gifts: gifts
                                                    });
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                    res.status(500).json({ error: err });
                                                });
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(500).json({ error: err });
                                        });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({ error: err });
                                });

                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ error: err });
                        });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
exports.company_getAll = (req, res, next) => {
    var sum = 0;
    var companyId;
    var arr = [];
    var rates = [];
    var query = "";
    var count = 0;
    User.findAll({ raw: true })
        .then(users => {
            for (var i = 0; i < users.length; i++) {
                sum = sum + users[i].rating;
            }
            Company.findAll({ raw: true })
                .then(companies => {
                    for (var j = 0; j < companies.length; j++) {
                        companyId = companies[j].id;
                        arr.push(companyId);

                        User.findAll({ where: { id_company: companyId }, raw: true })
                            .then(userid => {
                                count++;
                                var sumid = 0;
                                var rate = 0;
                                for (var k = 0; k < userid.length; k++) {
                                    sumid += userid[k].rating;
                                }
                                rate = sumid / sum * 100;
                                rates.push(rate);
                                if (count == 3) {
                                    for (var q = 0; q < arr.length; q++) {
                                        let query = `UPDATE companies SET rating=${rates[q]} WHERE id=${arr[q]};`;
                                        Connect.query(query, function(err, results) {
                                            if (err) console.log(err);
                                            console.log(results);
                                        });

                                    }

                                }
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({ error: err });
                            });
                    }
                    Company.findAll({
                            order: [
                                ['rating', 'DESC']
                            ],
                            raw: true
                        })
                        .then(companiess => {
                            res.status(200).json({
                                companiess: companiess
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ error: err });
                        });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}