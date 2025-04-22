import express from 'express';
import {postUserRegister,postUserLogin, postIsUserAuthenticated, postuserLogout} from '../Controllers/UserAuthController.js';
import userauth from '../middleware/userAuth.js';
const UserAuthRouter = express.Router();

UserAuthRouter.post("/user/register",postUserRegister);
UserAuthRouter.post("/user/login",postUserLogin);
UserAuthRouter.post('/isUserAuthenticated',userauth,postIsUserAuthenticated);
UserAuthRouter.post('/logout',postuserLogout);
export default UserAuthRouter;