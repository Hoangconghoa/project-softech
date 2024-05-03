import { Express } from "express";
import express from "express";
import orderController from "../../controllers/orders.controllers";
const router = express.Router();
// http://localhost:8686/api/v1/orders
router.get("/", orderController.getAll);

// http://localhost:8686/api/v1/orders/:id
router.get("/:id", orderController.getById);

// http://localhost:8686/api/v1/orders
router.post("/", orderController.create);

// http://localhost:8686/api/v1/orders/:id
router.put("/:id", orderController.updateById);

// http://localhost:8686/api/v1/orders/:id
router.delete("/:id", orderController.deleteById);

export default router;
