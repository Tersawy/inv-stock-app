let mongoose = require("mongoose");

// mongoose.set("useUnifiedTopology", true);

// mongoose.set("useFindAndModify", false);

// mongoose.set("useCreateIndex", true);

// mongoose.set("runValidators", true);

module.exports = mongoose
	.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, { useNewUrlParser: true })
	.then(() => console.log("\x1b[1m\x1b[45m%s\x1b[0m", "Connected To Database...."))
	.catch((err) => console.error(err));
