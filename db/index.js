const mongoose = require("mongoose");

mongoose.connection.on("connected", () =>
  console.log("Database Successfully Connected !!")
);
mongoose.connection.on("connecting", () =>
  console.log("Database is Connecting !!")
);
mongoose.connection.on("disconnected", () =>
  console.log("Database is Successfully Disconnected")
);
mongoose.connection.on("reconnected", () =>
  console.log("Database is reconnected !!")
);
mongoose.connection.on("disconnecting", () =>
  console.log("Database is Disconnecting !!")
);

mongoose.connection.on("error", (err) =>
  console.log(
    "There is Connection error may be due to malformed data !!",
    err.message
  )
);
mongoose.connection.on("open", () =>
  console.log("Database Connection is open !!")
);

exports.connectdb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log(connectionInstance.connection.host);
  } catch (error) {
    console.log("Mongodb Connection Error", error.message);
  }
};
