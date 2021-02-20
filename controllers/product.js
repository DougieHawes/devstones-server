const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

const Product = require("../models/product");

const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "image could not be uploaded",
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "all fields are required",
      });
    }

    let product = new Product(fields);

    product.name = product.name.toLowerCase();

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "image must be less than 1MB in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      res.json(result);
    });
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;

  return res.json(req.product);
};

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "product not found",
      });
    }

    req.product = product;

    next();
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "image could not be uploaded",
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "all fields are required",
      });
    }

    let product = req.product;

    product = _.extend(product, fields);

    product.name = product.name.toLowerCase();

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "image must be less than 1MB in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let product = req.product;

  product.remove((err, deletedProduct) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  });

  res.json({ msg: "product deleted" });
};
