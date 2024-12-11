// roles routes
import { Router } from "express";
import { 
  getAllRoles, 
  getRoleById, 
  createNewRole, 
  updateExistingRole, 
  deleteRoleById 
} from "../controllers/roleController";

const router = Router();

router.get('/roles', getAllRoles);
router.get('/roles/:id', getRoleById);
router.post('/roles', createNewRole);
router.put('/roles/:id', updateExistingRole);
router.delete('/roles/:id', deleteRoleById);

export default router;
