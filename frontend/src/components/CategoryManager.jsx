import { useState } from "react";

export default function CategoryManager({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.some((c) => c.name === trimmed)) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: trimmed }),
      });

      const data = await res.json();
      if (res.ok) {
        setCategories([...categories, { id: data.id, name: trimmed }]);
        setNewCategory("");
      } else {
        alert(data.error || "Erreur");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5001/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setCategories(categories.filter((cat) => cat.id !== id));
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch {
      alert("Erreur réseau");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Catégories personnalisées</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nouvelle catégorie"
          className="flex-1 p-2 border border-gray-300 rounded-l"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>

      <ul className="space-y-1">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded"
          >
            <span>{cat.name}</span>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
