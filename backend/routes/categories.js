const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, (req, res) => {
  try {
    const user_id = req.user.id;
    db.all("SELECT * FROM categories WHERE user_id = ? ORDER BY name", [user_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/", authenticateToken, (req, res) => {
  try {
    const { name } = req.body;
    const user_id = req.user.id;
    if (!name) return res.status(400).json({ error: "Nom requis" });

    db.run("INSERT INTO categories (name, user_id) VALUES (?, ?)", [name.trim(), user_id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name });
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/:id", authenticateToken, (req, res) => {
  try {
    const categoryId = req.params.id;
    const user_id = req.user.id;

    db.run("DELETE FROM categories WHERE id = ? AND user_id = ?", [categoryId, user_id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Catégorie non trouvée" });
      res.json({ success: true });
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;