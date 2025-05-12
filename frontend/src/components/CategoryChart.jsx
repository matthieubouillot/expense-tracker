import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ transactions }) {
  const categories = {};

  transactions.forEach((tx) => {
    const key = tx.category || "Autre";
    categories[key] = (categories[key] || 0) + tx.amount;
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#f87171",
          "#a78bfa",
          "#f472b6",
        ],
      },
    ],
  };

  return (
    <div className="mt-6 bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Répartition par catégorie</h2>
      <Pie data={data} />
    </div>
  );
}