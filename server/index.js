const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const convRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");

//initialize app
const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

//main routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", convRouter);
app.use("/api/messages", messageRouter);

//port
const PORT = process.env.PORT || 5000;

//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
