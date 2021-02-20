const router = require("express").Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  create,
  read,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  update,
  remove,
  productById,
} = require("../controllers/product");
const { userById } = require("../controllers/user");

router.post("/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/get/:productId", read);
router.put("/:productId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/:productId/:userId", requireSignin, isAuth, isAdmin, remove);

router.get("/", list);
router.get("/related/:productId", listRelated);
router.get("/categories", listCategories);
router.post("/by/search", listBySearch);
router.get("/photo/:productId", photo);

router.param("productId", productById);
router.param("userId", userById);

module.exports = router;
