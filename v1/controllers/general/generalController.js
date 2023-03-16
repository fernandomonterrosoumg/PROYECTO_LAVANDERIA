'use strict'

const conexion = require('../../../conexiones/oracledbCombex');


function listarClientes(req, res, next) {
    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_clientes.sql', options: { autoCommit: true,timeout: 2000 } })
        .then(function (result) {

            return res.status(200).send({ data: result.rows});
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function createPerson(req, res, next) {
    conexion.queryObject({ ruta: 'v1/src/querys/general/ins_persona.sql',bindParams:req.body, options: { autoCommit: true,timeout: 2000 } })
        .then(function (result) {

            return res.status(200).send({ data: "Persona creado correctamente"});
        })
        .catch(function (err) {
            return next(err.toString());
        });
}



module.exports = {
    listarClientes,
}