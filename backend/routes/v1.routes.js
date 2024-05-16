const router = require("express").Router();

// import controller product
const {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product_controllers");

// router main url
router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to API v1.0.0 - Learn Fullstack",
    data: null,
  });
});

// router url product
router.post("/product", createProduct);
router.get("/product", getProduct);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
