require("dotenv").config();
const express = require("express");
const app = express();
const yodleeRoutes = require("./routes/yodleeRoutes");

app.use(express.json());
app.use("/api/yodlee", yodleeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
