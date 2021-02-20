const router = require("express").Router();

const { userById, read, update } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/private/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile });
});

router.get("/:userId", requireSignin, isAuth, read);
router.put("/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;
