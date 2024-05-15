import express, { Express } from "express";
const router: Express = express();
import userController from "../../controllers/user.controller";
import { authenticateToken } from "../../middlewares/user.middlewares";

//http://localhost:8080/api/v1/auth/login
router.post("/login", userController.CustomerLogin);

//http://localhost:8080/api/v1/auth/refresh-token
router.post("/refresh-token", authenticateToken, userController.refreshToken);

//http://localhost:8080/api/v1/auth/profile
router.get("/profile", authenticateToken, userController.getProfile);

export default router;
