const router = require("express").Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  create,
  list,
  read,
  update,
  remove,
  categoryById,
} = require("../controllers/category");
const { userById } = require("../controllers/user");

router.post("/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/categories", list);
router.get("/:categoryId", read);
router.put("/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
