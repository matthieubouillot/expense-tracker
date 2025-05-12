Gestionnaire de Budget - Application Fullstack

Cette application permet aux utilisateurs de suivre leurs revenus et dépenses, de visualiser des graphiques de répartition, de gérer leurs catégories, et d'utiliser des filtres pour mieux analyser leurs finances.

🚀 Fonctionnalités principales

### Frontend (React + Tailwind)

- Authentification (connexion, inscription, déconnexion)
- Dashboard avec :
  - Solde actuel et récapitulatif des transactions
  - Ajout de transactions (revenu ou dépense)
  - Liste des transactions (masquable)
  - Filtres par catégorie, mois, année (masquables)
  - Graphiques :
    - Courbe mensuelle
    - Camembert par catégorie
  - Export PDF du mois filtré
  - Gestion des catégories personnalisées dans une section paramètres

### Backend (Node.js + Express + SQLite)

- Authentification JWT sécurisée
- Routes protégées :
  - `POST /auth/register` : créer un compte
  - `POST /auth/login` : connexion avec génération du token JWT
  - `GET /transactions` : récupération des transactions de l'utilisateur
  - `POST /transactions` : ajout
  - `DELETE /transactions/:id` : suppression
  - `GET /categories` : catégories personnelles
  - `POST /categories` : ajout de catégorie personnalisée
  - `DELETE /categories/:id` : suppression

🔧 Stack Technique

- **Frontend** : React, TailwindCSS
- **Backend** : Node.js, Express
- **Base de données** : SQLite3
- **Sécurité** : bcrypt, JWT
- **Autres** :
  - pdf-lib pour l'export PDF
  - react-chartjs-2 pour les graphiques
  - dotenv pour les variables d'environnement

📁 Structure des dossiers

```
/backend
├─ db.js
├─ index.js
├─ seed.sql
├─ routes/
│  ├─ auth.js
│  ├─ categories.js
│  └─ transactions.js
├─ middleware/
│  └─ auth.js

/frontend
├─ src/
│  ├─ App.jsx
│  ├─ context/
│  │  └─ AuthContext.js
│  ├─ components/
│  │  ├─ Login.jsx
│  │  ├─ Register.jsx
│  │  ├─ TransactionForm.jsx
│  │  ├─ TransactionList.jsx
│  │  ├─ TransactionFilters.jsx
│  │  ├─ CategoryManager.jsx
│  │  ├─ SummaryCard.jsx
│  │  ├─ CategoryChart.jsx
│  │  ├─ MonthlyBarChart.jsx
│  │  └─ ExportPDF.jsx
```

🕊️ Base de données

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  label TEXT NOT NULL,
  amount REAL NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

🏛️ Données de test (`seed.sql`)

```sql
-- Utilisateur de démonstration
INSERT INTO users (id, first_name, last_name, email, password) VALUES
(1, 'Demo', 'User', 'demo@demo.com', '$2b$10$UxtLAjs13MxhQddCoL0FS.kWN5hzMBj9ltQR6b3Z941abq8v42NVK');

-- Catégories associées à l'utilisateur demo
INSERT INTO categories (name, user_id) VALUES
('Logement', 1),
('Nourriture', 1),
('Transport', 1),
('Loisirs', 1),
('Santé', 1),
('Revenus', 1),
('Autre', 1);

-- Transactions d'exemple
INSERT INTO transactions (type, label, amount, date, category, user_id) VALUES
('income', 'Salaire', 2000, '2024-04-01', 'Revenus', 1),
('expense', 'Loyer', 800, '2024-04-02', 'Logement', 1),
('expense', 'Courses', 150, '2024-04-03', 'Nourriture', 1),
('expense', 'Essence', 60, '2024-04-04', 'Transport', 1),
('expense', 'Netflix', 13.99, '2024-04-05', 'Loisirs', 1),
('income', 'Freelance', 500, '2024-04-07', 'Revenus', 1),
('expense', 'Médecin', 45, '2024-04-08', 'Santé', 1);
```


📆 Roadmap (possibilités d'évolution)

- Pagination de la liste de transactions
- Modification des transactions
- Import/export CSV
- Mode sombre
- Vue mobile optimisée
- Ajout de tags/mémo
- Ajout de récurrences

🚀 Lancement local

### Backend
```bash
cd backend
npm install
npm run dev-setup
```
Cette commande initialise la base de données avec des données de démo, puis démarre le serveur Express.

📄 `.env` (Rajoutez-le dans le dossier backend)

```
PORT=5001
SECRET_JWT=ta_cle_secrete
```

### Frontend
```bash
cd frontend
npm install
npm start
```
Ouvre l’application dans le navigateur à l’adresse : http://localhost:3000

🔑 Compte de démonstration

- Email : `demo@demo.com`
- Mot de passe : `demo1234`

---

🧑‍💻 Projet développé par Matthieu Bouillot.
