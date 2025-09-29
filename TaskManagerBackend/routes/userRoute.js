import express from "express";
import { getCurrentUser, loginUser, registerUser, updatePassword, updateProfile } from "../controllers/userController.js";

import authMiddleware from "../middleware/userAuth.js";

const userRouter = express.Router()

// Pub Route

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// Private Route

userRouter.get('/me', authMiddleware, getCurrentUser)
userRouter.put('/profile', authMiddleware, updateProfile)
userRouter.put('/password', authMiddleware, updatePassword)

export default userRouter;