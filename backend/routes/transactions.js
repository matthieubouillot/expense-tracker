const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    db.all("SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC", [userId], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/", authenticateToken, (req, res) => {
  try {
    const { type, label, amount, date, category } = req.body;
    const user_id = req.user.id;
    if (!type || !label || !amount || !date || !category) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    db.run(
      "INSERT INTO transactions (type, label, amount, date, category, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [type, label, amount, date, category, user_id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/:id", authenticateToken, (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;
    db.run("DELETE FROM transactions WHERE id = ? AND user_id = ?", [id, user_id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
