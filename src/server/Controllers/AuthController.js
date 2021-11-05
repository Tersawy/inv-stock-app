const { ipcMain } = require("electron");

const User = require("../Models/User");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const bcrypt = require("bcrypt");

const fs = require("fs");

const path = require("path");

const { randomChar } = require("../../helpers/functions");
const { LOGIN } = require("../../helpers/channels");

// const nodemailer = require("nodemailer");

// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const imagesDir = path.resolve(__dirname, "../public/images/users");

const privateKey = fs.readFileSync("jwtRS256.key", "utf8");
const publicKey = fs.readFileSync("jwtRS256.key.pub", "utf8");

ipcMain.on(LOGIN, async (evt, payload) => {
	const { email, password } = payload;

	// let passwordHashed = await bcrypt.hash("123123123", 10);

	// let user = { username: "owner", fullname: "owner owner", phone: "01016205287", email: "owner@gmail.com", password: passwordHashed, type: 2 };

	// user = new User(user);

	// await user.save();

	try {
		let user = await User.findOne({ email });

		if (!user) return evt.reply(LOGIN, { status: 401, msg: "Email or password are not valid" });

		let same = await bcrypt.compare(password, user.password);

		if (!same) return evt.reply(LOGIN, { status: 401, msg: "Email or password are not valid" });

		const JWTPayload = { userId: user._id, type: user.type };

		const JWTSignOptions = { algorithm: "RS256", expiresIn: "8h" };

		jwt.sign(JWTPayload, privateKey, JWTSignOptions, async (err, token) => {
			if (err) throw err;

			user = {
				id: user.id,
				fullname: user.fullname,
				username: user.username,
				phone: user.phone,
				email: user.email,
				type: user.type,
				image: user.image
			};

			evt.reply(LOGIN, { status: 200, token, user });
		});
	} catch (err) {
		evt.reply(LOGIN, { status: err.status || 500, msg: err.msg || "Something went wrong!" });
	}
});

exports.register = async (req, res) => {
	const { username, fullname, phone, email, password, type } = req.body;

	let passwordHashed = await bcrypt.hash(password, 10);

	let userType = type ? 1 : 0;

	let user = { username, fullname, phone, email, password: passwordHashed, type: userType };

	user = new User(user);

	await user.save();

	res.status(200).json({ msg: "You're Welcome, you can now sign in" });
};

exports.me = (req, res) => {
	let token = req.headers.authorization;

	if (!token || token == "undefined") {
		throw { status: 401, msg: "Unauthentication" };
	}

	const JWTVerifyOptions = { algorithms: ["RS256"] };

	jwt.verify(token, publicKey, JWTVerifyOptions, async (err, decoded) => {
		if (err) return res.status(401).json({ msg: "Unauthentication" });

		let userQuery = { _id: decoded.userId, isActive: true };

		let user = await User.findOne(userQuery, { password: 0 });

		if (!user) return res.status(401).json({ msg: "Unauthentication" });

		let _user = { ...user._doc };

		return res.json({ status: 200, user: _user });
	});
};

exports.updateProfile = async (req, res) => {
	const { me, username, fullname, phone, email, password } = req.body;

	let updateData = { username, fullname, phone, email };

	if (password) {
		updateData.password = await bcrypt.hash(password, 10);
	}

	await User.updateOne({ _id: me._id }, updateData);

	res.json({ msg: "Your Profile has been updated successfully" });
};

exports.changeImage = (req, res) => {
	const { me } = req.body;

	const image = req.files && req.files.image ? req.files.image : null;

	if (!image) res.status(422).json({ msg: "image is required" });

	let extensionsAvailable = ["jpg", "jpeg", "png"];

	let imageNameSplited = image.name.split(".");

	let imageExtension = imageNameSplited[imageNameSplited.length - 1];

	if (!imageExtension || !extensionsAvailable.includes(imageExtension)) {
		return res.status(422).json({ msg: "Image is not valid" });
	}

	if (image.size > 2000000) return res.status(422).json({ thumbnail: "Image cannot be greater than 2 MB" });

	let imageName = `${randomChar(8)}_${Date.now()}.${imageExtension}`;

	if (!fs.existsSync(imagesDir)) return res.status(500).json({ msg: "Something went wrong" });

	let imageDir = path.resolve(imagesDir, imageName);

	image.mv(imageDir, async (err) => {
		if (err) return res.status(500).json({ msg: "Something went wrong" });

		await User.updateOne({ _id: me._id }, { image: imageName });

		res.json({ msg: "Your image has been updated successfully" });
	});
};

exports.reset = (req, res) => {
	const { email } = req.body;

	crypto.randomBytes(32, async (err, buffer) => {
		if (err) throw err;

		const token = buffer.toString("hex");

		let _user = await User.findOne({ email });

		if (!_user) throw { status: 422, errors: { email: "Email doesn't exist !" } };

		_user.remmemberToken = token;

		_user.expiresToken = Date.now() + 1200000;

		await _user.save();

		let url = `http://localhost:8080/reset-password/${token}`;

		const msg = {
			to: _user.email,
			from: process.env.EMAIL,
			subject: "🌻 CRM Password Reset 🌻",
			text: "and easy to do anywhere, even with Node.js",
			html: `
          <p>Hey ${_user.username},</p>
          <p>We heard that you lost your CRM password. Sorry about that!</p>
          <p>But don’t worry! You can use the following link to reset your password:</p>
          <a href=${url}>${url}</a>
          <p>If you don’t use this link within 20 minutes, it will expire.</p>
          <p>Do something outside today! </p>
          <p>–Your friends at CRM</p>
          `
		};

		await sgMail.send(msg);

		res.json({ status: 200, msg: "Email sent" });
	});
};

exports.newPassword = async (req, res) => {
	const { token, password } = req.body;

	let _user = await User.findOne({ remmemberToken: token, expiresToken: { $gt: Date.now() } });

	if (!_user) throw { status: 404, msg: "Url has been expired !" };

	let _password = await bcrypt.hash(password, 10);

	_user.password = _password;

	_user.remmemberToken = null;

	await _user.save();

	res.json({ status: 200, msg: "password has been changed successfuly" });
};

exports.verifyToken = async (req, res) => {
	const { token } = req.body;

	if (!token) throw { status: 404, msg: "Url has been expired !" };

	let user = await User.findOne({ remmemberToken: token, expiresToken: { $gt: Date.now() } });

	if (!user) throw { status: 404, msg: "Url has been expired !" };

	res.json({ status: 200 });
};
