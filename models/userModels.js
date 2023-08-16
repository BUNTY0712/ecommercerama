import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String, // q ki number char dono ho skta h
			required: true,
			trim: true, // use to remove all white space
		},
		email: {
			type: String,
			required: true,
			unique: true, // ek email se sirf ek user login hona chahiye
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
); // esse hogi ki jb v new user create hoga toh uska created time add ho jayega

export default mongoose.model('user', userSchema); // ye user jo hum mongoDB mein users bnaye h waha se match seplling macth hona chahiye
