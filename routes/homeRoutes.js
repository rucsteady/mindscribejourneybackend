const router = require("express").Router();
const homeController = require("../controllers/homeController");


router.get("/shirts", homeController.getShirts);
router.get("/", homeController.getIndex);
router.post("/create", homeController.create,homeController.redirectView );


module.exports = router;