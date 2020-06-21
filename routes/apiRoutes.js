"use strict";

const router = require("express").Router(),
  likesController = require("../controllers/likesController");

router.get(
  "/likes",
  likesController.index,
  likesController.filterUserLikes,
  likesController.respondJSON
);
router.get(
  "/likes/:id/join",
  likesController.join,
  likesController.respondJSON
);
router.use(likesController.errorJSON);

module.exports = router;
