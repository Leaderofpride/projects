const Skill = require("../models/skill");

exports.add_skill = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;

    Skill.findAll({ where: { title: title }, raw: true })
        .then(skill => {
            if (skill.length >= 1) {
                return res.status(409).json({
                    message: "Skill exists"
                });
            } else {
                Skill.create({
                    title: title,
                    description: description
                }).then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Skill created!",
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

exports.all_skills = (req, res, next) => {
    Skill.findAll({ raw: true })
        .then(skills => {
            res.status(200).json({
                skills: skills
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}