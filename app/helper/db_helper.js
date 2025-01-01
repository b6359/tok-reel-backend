
const helper = require('../helper/helper');
const db = require("../models");

module.exports = {
    isAllow: (id, token) => {
        return isAllow(id, token);
    },
    addData: (model, data) => {
        return addData(model, data);
    },
    allData: (model, requests = {}) => {
        requests.status = 0;
        return allData(model, requests);
    },
    byId: (model, id) => {
        return byId(model, id);
    },
    update: (model, data) => {
        return update(model, data);
    },
    statusChange: (model, data) => {
        return statusChange(model, data);
    },
    destroy: (model, data) => {
        return destroy(model, data);
    },
    query: (q) => {
        return query(q);
    },
    selectByPk: (model, id) => {
        return selectByPk(model, id);
    },
    selectByWhere: (model, data, attr = []) => {
        return selectByWhere(model, data, attr);
    }
}

async function query(q) {
    const result = await db.sequelize.query(q).then((res) => {
        return Array.from(new Set(res));
    })
    return result;
}


async function addData(model, data) {
    var err = [];
    const Response = await db[model].create(data).catch((ex) => err = ex.errors);
    if (err.length > 0) throw helper.HTTPError(404, err.message);
    return await Response;
}

async function allData(model, request = {} || []) {
    const datavalue = db[model].findAll({
        where: request
    });
    if (!datavalue) throw helper.HTTPError(404, `${model} was not found`);
    return await datavalue;
}

async function destroy(model, request = []) {
    const datavalue = db[model].destroy({
        where: request
    });
    if (!datavalue) throw helper.HTTPError(404, `${model} was not found`)
    return await datavalue;
}

async function byId(model, id) {
    const value = await db[model].findByPk(id);
    if (!value) throw helper.HTTPError(404, `${model} with id: ${id} was not found`);
    return await value;
}

async function update(model, data) {
    const datavalue = await db[model].findByPk(data.id)
    if (!datavalue) throw helper.HTTPError(404, `${model} with id: ${data.id} was not found`)
    for (const [key, value] of Object.entries(data)) {

        datavalue[key] = value;
    }
    return await datavalue.save();
}

async function statusChange(model, id) {
    const value = await db[model].findByPk(id);
    if (!value) throw helper.HTTPError(404, `${model} with id: ${input.id} was not found`);
    value.status = 1;
    return await value.save();
}


async function selectByPk(model, id) {
    const data = await db[model].findByPk(id);
    return await data;
}



async function selectByWhere(model, data, attr) {

    var b = { where: data }
    if (attr.length > 0) {
        b.attributes = attr;
    }

    const datavalue = await db[model].findAll(b);

    return await datavalue;
}