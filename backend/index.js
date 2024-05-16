require("dotenv").config();
const express = require("express");
const app = express();
const v1router = require("./routes/v1.routes");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// cors
app.use(
  cors({
    origin: "*",
  })
);

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router url main
app.use("/", v1router);

// router api main
app.use("/api/v1", v1router);

// Port server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
