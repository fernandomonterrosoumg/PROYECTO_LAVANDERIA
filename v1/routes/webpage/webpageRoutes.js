'use strict'

var express = require("express");
var webpageController = require("../../controllers/webpage/webpageController");

var api = express.Router();
//RUTAS
//api.post('/menu' ,webpageController.getMenu);
//api.get('/menu' ,webpageController.getPrueba);
api.get('/getMenuUser' ,webpageController.getMenuUser);

//EXPORTACION DE RUTAS
module.exports = api;