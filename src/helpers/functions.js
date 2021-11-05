const fs = require("fs").promises;

exports.randomChar = (num = 8) => {
	let chars = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

	let random = "";

	for (let i = 0; i < num; i++) {
		random += chars[Math.floor(Math.random() * chars.length)];
	}

	return random;
};
