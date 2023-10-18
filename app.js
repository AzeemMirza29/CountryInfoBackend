const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');

 const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

// Define routes
app.use("/", require("./routes/authRoutes"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


