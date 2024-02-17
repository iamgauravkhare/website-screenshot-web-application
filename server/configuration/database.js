const mongoose = require("mongoose");

exports.databaseConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log(`Database connection successfully established!`))
    .catch((error) => {
      console.log(`Database connection failed!`);
      console.error(error);
      process.exit(1);
    });
};
