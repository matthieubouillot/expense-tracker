import { useEffect, useState, useCallback } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CategoryChart from "./components/CategoryChart";
import TransactionFilters from "./components/TransactionFilters";
import MonthlyBarChart from "./components/MonthlyBarChart";
import SummaryCard from "./components/SummaryCard";
import Login from "./components/Login";
import CategoryManager from "./components/CategoryManager";
import ExportPDF from "./components/ExportPDF";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ category: "", month: "", year: "" });
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTransactions, setShowTransactions] = useState(true);

  const token = user?.token;

  const fetchTransactions = useCallback(async () => {
    if (!user || !token) return;

    try {
      const res = await fetch("http://localhost:5001/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setTransactions(Array.isArray(data) ? data : []);
      } else {
        console.error("[App] Erreur backend (transactions) :", data);
        alert(data.error || "Impossible de charger les transactions");
        setTransactions([]);
      }
    } catch (error) {
      console.error("[App] Erreur fetch transactions :", error);
      alert("Erreur de connexion au serveur (transactions)");
    }
  }, [user, token]);

  const fetchCategories = useCallback(async () => {
    if (!user || !token) return;

    try {
      const res = await fetch("http://localhost:5001/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setCategories(Array.isArray(data) ? data : []);
      } else {
        console.error("[App] Erreur backend (categories) :", data);
        alert(data.error || "Impossible de charger les catégories");
        setCategories([]);
      }
    } catch (error) {
      console.error("[App] Erreur fetch catégories :", error);
      alert("Erreur de connexion au serveur (catégories)");
    }
  }, [user, token]);

  const handleAddTransaction = async (newTx) => {
    try {
      const res = await fetch("http://localhost:5001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTx),
      });

      if (res.ok) {
        await fetchTransactions();
      } else {
        const data = await res.json();
        console.error("[App] Erreur ajout transaction :", data);
        alert(data.error || "Erreur lors de l'ajout de la transaction");
      }
    } catch (error) {
      console.error("[App] Erreur POST :", error);
      alert("Erreur réseau lors de l'ajout");
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        await fetchTransactions();
      } else {
        const data = await res.json();
        console.error("[App] Erreur suppression transaction :", data);
        alert(data.error || "Erreur lors de la suppression de la transaction");
      }
    } catch (error) {
      console.error("[App] Erreur suppression :", error);
      alert("Erreur réseau lors de la suppression");
    }
  };

  useEffect(() => {
    if (user) {
      fetchTransactions();
      fetchCategories();
    }
  }, [user, fetchTransactions, fetchCategories]);

  const filteredTransactions = Array.isArray(transactions)
    ? transactions.filter((tx) => {
        const txDate = new Date(tx.date);
        const txMonth = (txDate.getMonth() + 1).toString().padStart(2, "0");
        const txYear = txDate.getFullYear().toString();

        return (
          (!filters.category || tx.category === filters.category) &&
          (!filters.month || txMonth === filters.month) &&
          (!filters.year || txYear === filters.year)
        );
      })
    : [];

  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6 max-w-xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Gestionnaire de Budget 💰</h1>
          <p className="text-gray-600">
            Bienvenue {user.first_name} {user.last_name}
          </p>
        </div>
        <button onClick={logout} className="text-sm text-red-600 underline">
          Se déconnecter
        </button>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <SummaryCard transactions={filteredTransactions} />

        <div className="flex justify-between flex-wrap gap-2">
          <button
            className="text-sm text-blue-600 underline"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </button>

          <button
            className="text-sm text-blue-600 underline"
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? "Masquer les catégories" : "Afficher les catégories"}
          </button>

          <button
            className="text-sm text-blue-600 underline"
            onClick={() => setShowTransactions(!showTransactions)}
          >
            {showTransactions ? "Masquer les transactions" : "Afficher les transactions"}
          </button>
        </div>

        {showFilters && (
          <TransactionFilters
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
        )}

        {showSettings && (
          <CategoryManager
            categories={categories}
            setCategories={setCategories}
            token={token}
          />
        )}

        <TransactionForm onAdd={handleAddTransaction} categories={categories} />

        {showTransactions && (
          <TransactionList
            transactions={filteredTransactions}
            onDelete={handleDeleteTransaction}
          />
        )}

        {filteredTransactions.length > 0 && (
          <>
            <CategoryChart transactions={filteredTransactions} />
            <MonthlyBarChart transactions={filteredTransactions} />
          </>
        )}

        <ExportPDF transactions={filteredTransactions} user={user} />
      </div>
    </div>
  );
}

export default App;
