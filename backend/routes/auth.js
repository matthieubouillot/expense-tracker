const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

const SECRET = process.env.SECRET_JWT || "dev_secret";

const defaultCategories = [
  "Logement",
  "Nourriture",
  "Transport",
  "Loisirs",
  "Santé",
  "Revenus",
  "Autre"
];

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
      [first_name, last_name, email, hashedPassword],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        const userId = this.lastID;

        const stmt = db.prepare(`INSERT INTO categories (name, user_id) VALUES (?, ?)`);
        defaultCategories.forEach((name) => stmt.run(name, userId));
        stmt.finalize(() => {
          const token = jwt.sign({ id: userId, email }, SECRET, { expiresIn: "7d" });
          res.status(201).json({ user: { id: userId, email, first_name, last_name }, token });
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: "Utilisateur introuvable" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Mot de passe incorrect" });

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "7d" });

      res.json({
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        token
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
