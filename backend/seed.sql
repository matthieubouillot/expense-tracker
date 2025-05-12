-- Supprime les données existantes
DELETE FROM transactions;
DELETE FROM categories;
DELETE FROM users;

-- Insère l’utilisateur demo
INSERT INTO users (id, first_name, last_name, email, password) VALUES
(1, 'Demo', 'User', 'demo@demo.com', '$2b$10$UxtLAjs13MxhQddCoL0FS.kWN5hzMBj9ltQR6b3Z941abq8v42NVK');

-- Catégories de base
INSERT INTO categories (name, user_id) VALUES
('Logement', 1),
('Nourriture', 1),
('Transport', 1),
('Loisirs', 1),
('Santé', 1),
('Revenus', 1),
('Autre', 1);

-- Transactions de test
INSERT INTO transactions (type, label, amount, date, category, user_id) VALUES
('income', 'Salaire', 2000, '2024-04-01', 'Revenus', 1),
('expense', 'Loyer', 800, '2024-04-02', 'Logement', 1),
('expense', 'Courses', 150, '2024-04-03', 'Nourriture', 1),
('expense', 'Essence', 60, '2024-04-04', 'Transport', 1),
('expense', 'Netflix', 13.99, '2024-04-05', 'Loisirs', 1),
('income', 'Freelance', 500, '2024-04-07', 'Revenus', 1),
('expense', 'Médecin', 45, '2024-04-08', 'Santé', 1);