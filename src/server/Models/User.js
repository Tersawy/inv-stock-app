const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const { USER } = require("../../helpers/constants");

const UserSchema = new Schema(
	{
		username: String,
		fullname: String,
		phone: String,
		email: String,
		password: String,
		type: {
			type: Number,
			default: USER
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User"
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
