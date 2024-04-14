const { validationResult } = require('express-validator');
const Model = require('../models/cirriclum');



const insert = async (req, res) => {
    try {
        const result = {};
        const courses = await Model.insert(req);
        result.status = 200;
        result.data = courses;
        res.status(result.status).send(result);
    } catch (err) {
        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}

const update = async (req, res) => {
    try {
        const result = {};
        const courses = await Model.update(req);
        result.status = 200;
        result.data = courses;
        res.status(result.status).send(result);
    } catch (err) {
        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}

const list = async (req, res) => {
    try {
        const result = {};
        const courses = await Model.list(req);
        result.status = 200;
        result.data = courses;
        res.status(result.status).send(result);
    } catch (err) {
        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}

const edit = async (req, res) => {
    try {
        const result = {};
        const courses = await Model.edit(req);
        result.status = 200;
        result.data = courses;
        res.status(result.status).send(result);
    } catch (err) {
        console.log("err: ");
        console.log(err);

        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}

const deletedata = async (req, res) => {
    try {
        const result = {};
        const courses = await Model.deletedata(req);
        result.status = 200;
        result.data = courses;
        res.status(result.status).send(result);
    } catch (err) {
        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}




module.exports = { insert, update, list, edit,deletedata }