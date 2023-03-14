'use strict'

var express = require("express");
var generalController = require("../../controllers/general/generalController");

var api = express.Router();
//RUTAS
api.post('/createPerson' ,generalController.createPerson);
api.get('/listarPersonasCuenta' ,generalController.listarPersonasCuenta);
api.post('/createCuenta' ,generalController.createCuenta);

//EXPORTACION DE RUTAS
module.exports = api;