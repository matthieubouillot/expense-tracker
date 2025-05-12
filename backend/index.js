require("dotenv").config();
const express = require("express");
const cors = require("cors");

const transactionsRoutes = require("./routes/transactions");
const authRoutes = require("./routes/auth");
const categoriesRoutes = require("./routes/categories");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/transactions", transactionsRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoriesRoutes);

app.listen(PORT, () => {
});