// users routes
import { Router } from "express";
import { getAllUsers, getUserById, createNewUser, updateExistingUser, deleteUserById } from "../controllers/userController"

const router = Router()

// define routes
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.post('/users', createNewUser)
router.put('/user/:id', updateExistingUser)
router.delete('/users/:id', deleteUserById)

export default router;