const IntModel = require('../models/int.model');
const crypto = require('crypto'); 
require('log-timestamp');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    console.log('int.controller.insert :: body = ' + req.body);
    IntModel.createInt(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    console.log('int.controller.list :: limit = ' + limit + ', page = ' + page);
    IntModel.listInt(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    console.log('int.controller.getById :: userId = ' + req.params.Id);
    IntModel.findById(req.params.Id)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    console.log('int.controller.js : patchById('+req.params.Id+', '+req.body+')');
    IntModel.patchUser(req.params.Id, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};