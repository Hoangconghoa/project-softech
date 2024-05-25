import express from "express";
import productsController from "../../controllers/products.controller";
// import validateSchema from "../../middlewares/validateSchema.middleware";
// import productsValidation from "../../validations/products.validation";
const router = express.Router();

router.get("", productsController.countProductsByCategory);
export default router;
