import { Router } from 'express';
import { getAllUsers } from '../controllers/User_Controller.js';

const router = Router();
router.get('/get-users', getAllUsers);

export default router;
