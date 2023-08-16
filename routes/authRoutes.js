import express from 'express';
import {
	loginController,
	registerController,
} from '../controllers/authController.js';

//router object
const router = express.Router(); //agar ap seprate file mein
// create krenge toh apko routing ka apko object lgta h

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

export default router;
