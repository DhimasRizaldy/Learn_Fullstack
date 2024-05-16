const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// call handler pagination
const { getPagination } = require("../handler/pagination");
const { get } = require("../routes/v1.routes");

module.exports = {
  // create product
  createProduct: async (req, res, next) => {
    try {
      let { name, price, quantity } = req.body;

      let newProduct = await prisma.product.create({
        data: {
          name,
          price,
          quantity,
        },
      });
      res.status(201).json({
        status: true,
        message: "Product created successfully",
        data: newProduct,
      });
    } catch (err) {
      next(err);
    }
  },

  // get all product
  getProduct: async (req, res, next) => {
    try {
      // call handler pagination
      let { limit = 5, page = 1 } = req.query;
      limit = Number(limit);
      page = Number(page);

      let products = await prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      const { _count } = await prisma.product.aggregate({
        _count: { id: true },
      });

      let pagination = getPagination(req, _count.id, page, limit);

      res.status(200).json({
        status: true,
        message: "Get all product successfully",
        data: { products, pagination },
      });
    } catch (err) {
      next(err);
    }
  },

  // get product by id
  getProductById: async (req, res, next) => {
    try {
      let { id } = req.params;
      let products = await prisma.product.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!products) {
        return res.status(404).json({
          status: false,
          message: "Product not found",
          data: `Data Product Not Found ` + id,
        });
      }

      res.status(200).json({
        status: true,
        message: "Get product by id successfully",
        data: products,
      });
    } catch (err) {
      next(err);
    }
  },

  // update product
  updateProduct: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { name, price, quantity } = req.body;

      let updateOperation = await prisma.product.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          price,
          quantity,
        },
      });

      res.status(200).json({
        status: true,
        message: "Product updated successfully",
        data: updateOperation,
      });
    } catch (err) {
      next(err);
    }
  },

  // delete product
  deleteProduct: async (req, res, next) => {
    try {
      let { id } = req.params;

      let findProduct = await prisma.product.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!findProduct) {
        return res.status(404).json({
          status: false,
          message: "Product not found",
          data: `Data Product Not Found ` + id,
        });
      }

      let deleteOperation = await prisma.product.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({
        status: true,
        message: "Product deleted successfully",
        data: deleteOperation,
      });
    } catch (err) {
      next(err);
    }
  },
};
