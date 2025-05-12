export default function TransactionFilters({ filters, setFilters, categories }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-4 items-end">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Catégorie</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Mois</label>
        <select
          name="month"
          value={filters.month}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Tous les mois</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
            const padded = m.toString().padStart(2, "0");
            return <option key={m} value={padded}>{padded}</option>;
          })}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Année</label>
        <select
          name="year"
          value={filters.year}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Toutes les années</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
}