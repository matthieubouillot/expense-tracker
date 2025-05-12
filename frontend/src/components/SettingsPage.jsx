import CategoryManager from "../components/CategoryManager";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5001/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur récupération catégories:", error);
      }
    };

    if (user) fetchCategories();
  }, [user, token]);

  if (!user) return <p>Non autorisé</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
      <CategoryManager categories={categories} setCategories={setCategories} token={token} />
    </div>
  );
}