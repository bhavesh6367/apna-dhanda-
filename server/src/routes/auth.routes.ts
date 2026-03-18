import express from "express";
import { register, login, refresh, logout, getMe } from "../controllers/auth.controller";
import { authRateLimiter } from "../middleware/rateLimit";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);

export default router;
