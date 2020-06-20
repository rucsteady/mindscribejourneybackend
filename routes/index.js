const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"),
  likeRoutes = require("./likeRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");

router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/likes", likeRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
