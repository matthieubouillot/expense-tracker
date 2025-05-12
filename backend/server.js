const express = require("express");
const cors = require("cors");
const transactionsRoutes = require("./routes/transactions");
const authRoutes = require("./routes/auth");
const categoriesRoutes = require("./routes/categories");



const app = express();

// CORS autorisé pour tout (temporaire)
app.use(cors());
app.options("*", cors());

app.use(express.json());

// ✅ Route valide
app.use("/transactions", transactionsRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoriesRoutes);

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
});