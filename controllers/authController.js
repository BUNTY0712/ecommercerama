import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModels from '../models/userModels.js';
import JWT from 'jsonwebtoken';

// ( /register pe humlog frontend se hit krwate h or phir registercontroller pr aate h or check krte sara validation or phir sara data usermodel ke a/c save krwa dete h )

// req se humlog ka frontend se data aa raha hota h
// res se humlog backend se data ya message frontend mein send kr rhe hote h

export const registerController = async (req, res) => {
	try {
		const { name, email, password, phone, address } = req.body;
		//validations
		if (!name) {
			return res.send({ error: 'Name is Requires' });
		}
		if (!email) {
			return res.send({ error: 'email is Requires' });
		}
		if (!password) {
			return res.send({ error: 'password is Requires' });
		}

		//cehck user
		const existingUser = await userModels.findOne({ email });
		if (existingUser) {
			return res.status(200).send({
				success: true,
				message: 'Already Register please login',
			});
		}

		//register user
		const hashedPassword = await hashPassword(password);
		//save
		const user = await new userModels({
			name,
			email,
			password: hashedPassword,
		}).save();

		res.status(201).send({
			success: true,
			message: 'User Register Success',
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in Registration',
			error,
		});
	}
};

export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		// validation
		if (!email || !password) {
			return res.status(404).send({
				success: false,
				message: 'Invalid email or password',
			});
		}
		// humlog request body password se database ke ander jo user pe jo password tha uss se compare kr rahe h

		// check user
		const user = await userModels.findOne({ email });
		if (!user) {
			res.status(404).send({
				success: false,
				message: 'Email is not register',
			});
		}

		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.status(404).send({
				success: false,
				message: 'Invalid Password',
			});
		}

		//token
		const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});
		res.status(200).send({
			success: true,
			message: 'login successfully',
			user: {
				email: user.email,
			},
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in login',
			error,
		});
	}
};
