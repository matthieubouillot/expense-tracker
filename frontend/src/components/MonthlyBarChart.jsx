import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);
  
  export default function MonthlyBarChart({ transactions }) {
    const monthlyData = {};
  
    transactions.forEach((tx) => {
      const month = tx.date.slice(0, 7); // format YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }
  
      if (tx.type === "income") {
        monthlyData[month].income += tx.amount;
      } else {
        monthlyData[month].expense += tx.amount;
      }
    });
  
    const months = Object.keys(monthlyData).sort();
  
    const data = {
      labels: months,
      datasets: [
        {
          label: "Revenus",
          data: months.map((m) => monthlyData[m].income),
          backgroundColor: "#4ade80",
        },
        {
          label: "Dépenses",
          data: months.map((m) => monthlyData[m].expense),
          backgroundColor: "#f87171",
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: (v) => `${v} €` },
        },
      },
    };
  
    return (
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Évolution mensuelle</h2>
        <Bar data={data} options={options} />
      </div>
    );
  }