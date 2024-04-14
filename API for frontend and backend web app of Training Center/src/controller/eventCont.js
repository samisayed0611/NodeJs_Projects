const { validationResult } = require('express-validator');
const Model = require('../models/event');


const insert = async (req, res) => {
    try {
        const result = {};
        const eventdata = await Model.insert(req);
        result.status = 200;
        result.data = eventdata;
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
        const eventdata = await Model.update(req);
        result.status = 200;
        result.data = eventdata;
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
        const eventdata = await Model.list(req);
        result.status = 200;
        result.data = eventdata;
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
        const eventdata = await Model.edit(req);
        result.status = 200;
        result.data = eventdata;
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
        const eventdata = await Model.deletedata(req);
        result.status = 200;
        result.data = eventdata;
        res.status(result.status).send(result);
    } catch (err) {
        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}

const Eventcategoryadd = async (req, res) => {
    try {
        const result = {};
        const eventdata = await Model.Eventcategoryadd(req);
        result.status = 200;
        result.data = eventdata;
        res.status(result.status).send(result);
    } catch (err) {
        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}
const eventcatlist = async (req, res) => {
    try {
        const result = {};
        const eventdata = await Model.eventcatlist(req);
        result.status = 200;
        result.data = eventdata;
        res.status(result.status).send(result);
    } catch (err) {
        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}
const eventcatedit = async (req, res) => {
    try {
        const result = {};
        const eventdata = await Model.eventcatedit(req);
        result.status = 200;
        result.data = eventdata;
        res.status(result.status).send(result);
    } catch (err) {
        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}

const Eventcategoryupdate = async (req, res) => {
    try {
        const result = {};
        const eventdata = await Model.Eventcategoryupdate(req);
        result.status = 200;
        result.data = eventdata;
        res.status(result.status).send(result);
    } catch (err) {
        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}

const deleteeventcat = async (req, res) => {
    try {
        const result = {};
        const eventdata = await Model.deleteeventcat(req);
        result.status = 200;
        result.data = eventdata;
        res.status(result.status).send(result);
    } catch (err) {
        const error = {};
        error.status = 500;
        error.message = "something wen't wrong...!!"
        res.status(error.status).send({ status: error.status, msg: error.message });
    }
}












module.exports = { insert, update, list, edit,deletedata,Eventcategoryadd,eventcatlist,eventcatedit,Eventcategoryupdate,deleteeventcat }