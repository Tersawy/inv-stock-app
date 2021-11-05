const { ipcMain } = require("electron");

const User = require("../Models/User");

const bcrypt = require("bcrypt");

const { USERS } = require("../../helpers/channels");

ipcMain.on(USERS, (evt) => {
	let users = User.find();

	let usersCount = User.countDocuments();

	let [docs, total] = await Promise.all([users, usersCount]);

	evt.reply(USERS, { docs, total });
});

ipcMain.on("users::create", (evt, data) => {
	const { username, fullname, phone, email, password, type } = data;

	let passwordHashed = await bcrypt.hash(password, 10);

	const user = new User({ username, fullname, phone, email, password: passwordHashed, type });

	await user.save();

	evt.reply("users::create", { msg: "The User has been created successfully" });
});

ipcMain.on("users::update", (evt, data) => {
	const { username, fullname, phone, email, password, type, _id } = data;

	let userData = { username, fullname, phone, email, type };

	if (password) {
		userData.password = await bcrypt.hash(password, 10);
	}

	await User.updateOne({ _id }, userData);

	evt.reply("users::update", { msg: "The User has been updated successfully" });
});

ipcMain.on("users::changeActivation", (evt, data) => {
	const { isActive, _id } = data;

	await User.updateOne({ _id }, { isActive });

	evt.reply("users::changeActivation", { msg: `The User has been ${isActive ? "activated" : "deactivated"} successfully` });
});

ipcMain.on("users::remove", (evt, data) => {
	const { _id } = data;

	await User.deleteOne({ _id });

	evt.reply("users::remove", { msg: "The User has been deleted successfully" });
});
