import { useState } from "react";

export default function TransactionForm({ onAdd, categories }) {
  const [type, setType] = useState("income");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label || !amount || !date || !category) return alert("Remplis tous les champs");

    const transaction = {
      type,
      label,
      amount: parseFloat(amount),
      date,
      category,
    };

    onAdd(transaction);
    setLabel("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md space-y-4">
      <div className="flex items-center space-x-4">
        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
          <option value="income">Revenu</option>
          <option value="expense">Dépense</option>
        </select>
        <input
          type="text"
          placeholder="Libellé"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <input
          type="number"
          placeholder="Montant"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-32 rounded"
        />
      </div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">-- Sélectionner une catégorie --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Ajouter
      </button>
    </form>
  );
}
