const Gift = require("../models/gift");
const User = require("../models/user");

exports.add_gift = (req, res, next) => {
    const id_company = req.body.id_company;
    const name_user = req.body.name_user;
    const balance = req.body.balance;

    if (balance < 2) {
        Gift.create({
            id_company: id_company,
            text: `${balance} day off was given to ${name_user}`
        }).then(result => {
            console.log(result);
            User.update({ balance: 0 }, { where: { name: name_user } })
                .then(() => {
                    res.status(201).json({
                        message: "Review created!",
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });

        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    } else {
        Gift.create({
            id_company: id_company,
            text: `${balance} days off were given to ${name_user}`
        }).then(result => {
            console.log(result);
            User.update({ balance: 0 }, { where: { name: name_user } })
                .then(() => {
                    res.status(201).json({
                        message: "Review created!",
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
}