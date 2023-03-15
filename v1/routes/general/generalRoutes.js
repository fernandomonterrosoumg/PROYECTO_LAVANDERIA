'use strict'

var express = require("express");
var generalController = require("../../controllers/general/generalController");

var api = express.Router();
//RUTAS
api.get('/listarClientes' ,generalController.listarClientes);
//api.post('/createCuenta' ,generalController.createCuenta);

//EXPORTACION DE RUTAS
module.exports = api;