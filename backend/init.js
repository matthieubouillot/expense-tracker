const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`PRAGMA foreign_keys = ON`);

  // Création des tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      label TEXT NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error("❌ Erreur création tables :", err.message);
      process.exit(1);
    }

    // Quand les tables sont prêtes, on exécute le seed
    const seedSQL = fs.readFileSync("./seed.sql", "utf-8");
    db.exec(seedSQL, (err) => {
      if (err) {
        console.error("❌ Erreur lors de l’exécution du seed :", err.message);
        process.exit(1);
      } else {
        console.log("✅ Base initialisée avec succès.");
        process.exit(0);
      }
    });
  });
});