// user routes
import { Router } from "express";
import { 
  getAllUsers, 
  getUserById, 
  createNewUser, 
  updateExistingUser, 
  deleteUserById 
} from "../controllers/userController";

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createNewUser);
router.put('/users/:id', updateExistingUser);
router.delete('/users/:id', deleteUserById); 

export default router;
