import express from "express";
import { login, signup } from "...";

const router: express.Router = express.Router();

// POST /api/auth/signup
router.post("/signup", signup);

// POST /api/auth/login
router.post("/login", login);

export default router;
