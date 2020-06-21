const router = require("express").Router();
const likesController = require("../controllers/likesController");

router.get("/", likesController.index, likesController.indexView);
router.get("/new", likesController.new);
router.post(
  "/create",
  likesController.create,
  likesController.redirectView
);
router.get("/:id", likesController.show, likesController.showView);
router.get("/:id/edit", likesController.edit);
router.put(
  "/:id/update",
  likesController.update,
  likesController.redirectView
);

router.delete(
  "/:id/delete",
  likesController.delete,
  likesController.redirectView
);

router.post(
  "/delete/Likes",
  likesController.deleteLikes,
  likesController.redirectView
);

module.exports = router;
