import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (error) {
		console.log(error);
	}
};

export const comparePassword = async (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};

// Salting: Salting is a technique used to enhance the security of hashed passwords. A "salt" is a random value that is generated for each user and then combined with their password before hashing. The salt is then stored alongside the hash in the database. This makes it much more difficult for attackers to use precomputed tables (rainbow tables) to quickly crack hashed passwords, as each password hash has a unique salt.

// saltRounds: The saltRounds parameter in bcrypt specifies the number of rounds of processing that the library should use to generate the salt. More rounds mean more computational work, making it more difficult and time-consuming for attackers to perform brute-force or dictionary attacks. However, more rounds also increase the time it takes to hash passwords, so there's a trade-off between security and performance.
