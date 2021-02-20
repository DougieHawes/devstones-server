const router = require("express").Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  create,
  read,
  update,
  remove,
  productById,
} = require("../controllers/product");
const { userById } = require("../controllers/user");

router.post("/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/:productId", read);
router.put("/:productId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/:productId/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("productId", productById);
router.param("userId", userById);

module.exports = router;
