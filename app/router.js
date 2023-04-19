//router.js
const express = require("express");
//const router = express()
const controller = require("./controller");
const middelwares = require ("./services/middlewares")


//User routes
routeur.post('/api/add-user', middelwares.isAdmin, middelwares.isBureau, controller.addUser);
routeur.post('/api/add-instrument', middelwares.isBureau, controller)
//Instrument routes


//Suit routes
router.post('/api/suits', suitController.getAllSuits);


router.get("/",controller.);


router.post("/",controller.);

module.exports = router;