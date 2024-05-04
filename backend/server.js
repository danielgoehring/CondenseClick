require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5001;
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Connection to the MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) =>
    console.error("MongoDB connection unsuccessful. Error: ", err)
  );

// A mongoose schema is created for the url the user enters
const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  newURL: { type: String, required: true },
  key: { type: String, required: true },
});

// Model created
const UserURL = mongoose.model("UserURL", urlSchema);

// This deals with the submission of the form
app.post("/submit", async (request, response) => {
  try {
    const userUrl = new UserURL({
      url: request.body.url,
      newURL: request.body.newURL,
      key: request.body.key,
    });
    // The will save the url entered by the user to the database
    await userUrl.save();
    response
      .status(201)
      .send({ message: "User URL saved successfully", userUrl: userUrl });
  } catch (err) {
    response.status(400).send(err.message);
  }
});

// This will redirect to the original url the user entered
app.get("/:key", async (request, response) => {
  try {
    const userUrl = await UserURL.findOne({ key: request.params.key });
    if (!userUrl) {
      return response.status(404).send("404");
    }
    response.redirect(userUrl.url);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`The server has successfully started running on ${PORT}`);
});
