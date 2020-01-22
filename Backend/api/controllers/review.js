const Review = require("../models/review");
const User = require("../models/user");

exports.add_review = (req, res, next) => {
    const id_user = req.body.id_user;
    const id_author = req.body.id_author;
    const name_author = req.body.name_author;
    const title = req.body.title;
    const message = req.body.message;

    User.findAll({ where: { id: id_user }, raw: true })
        .then(user => {
            const balance = user[0].balance + 1;
            const rating = user[0].rating + 1;
            User.update({ balance: balance, rating: rating }, { where: { id: id_user } })
                .then(() => {
                    Review.create({
                        id_user: id_user,
                        id_author: id_author,
                        name_author: name_author,
                        title: title,
                        message: message
                    }).then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Review created!",
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}