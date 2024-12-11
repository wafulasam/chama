// member routes
import { Router } from "express";
import { 
  getAllMembers, 
  getMemberById, 
  createNewMember, 
  updateExistingMember, 
  deleteMemberById 
} from "../controllers/memberController";

const router = Router();

router.get('/members', getAllMembers);
router.get('/members/:id', getMemberById);
router.post('/members', createNewMember);
router.put('/members/:id', updateExistingMember);
router.delete('/members/:id', deleteMemberById);

export default router;
