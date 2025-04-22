import express from 'express';
import {postAdminRegister,postAdminLogin} from '../Controllers/AdminAuthController.js';
const AdminAuthRouter = express.Router();
AdminAuthRouter.post('/admin/login',postAdminLogin);
AdminAuthRouter.post('/admin/register',postAdminRegister);
export default AdminAuthRouter;