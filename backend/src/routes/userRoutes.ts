// users routes
import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController"

const router = Router()

// define routes
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)
router.put('/user/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router;