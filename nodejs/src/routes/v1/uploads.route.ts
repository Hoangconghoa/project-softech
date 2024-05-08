import express from "express";
import uploadsControllers from "../../controllers/uploads.controllers";
const router = express.Router();
router.post("/", uploadsControllers.create);
export default router;
