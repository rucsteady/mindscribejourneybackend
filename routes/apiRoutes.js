"use strict";

const router = require("express").Router(),
  likesController = require("../controllers/likesController");

router.get("/likes", likesController.index, likesController.respondJSON);
router.use(likesController.errorJSON);

module.exports = router;
