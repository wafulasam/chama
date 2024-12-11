// activity routes
import { Router } from "express";
import { 
  getAllActivityLogs, 
  getActivityLogById, 
  createActivityLog, 
  updateActivityLog, 
  deleteActivityLog 
} from "../controllers/activityController";

const router = Router();

router.get('/activity-logs', getAllActivityLogs);
router.get('/activity-logs/:id', getActivityLogById);
router.post('/activity-logs', createActivityLog); 
router.put('/activity-logs/:id', updateActivityLog);
router.delete('/activity-logs/:id', deleteActivityLog);

export default router;
