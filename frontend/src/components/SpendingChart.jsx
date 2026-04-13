import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
	"#1D9E75",
	"#185FA5",
	"#BA7517",
	"!A32D2D",
	"#534AB7",
	"#993556",
];

function SpendingChart({ summary }) {
	if (!summary || !summary.by_category) return null;

	const filtered = Object.entries(summary.by_category).filter(
		([cat]) => cat !== "income",
	);

	const labels = filtered.map(([cat]) => cat);
	const values = filtered.map(([, val]) => val);

	const data = {
		labels,
		datasets: [
			{
				data: values,
				backgroundColor: COLORS.slice(0, labels.length),
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: { position: "bottom" },
		},
	};

	return (
		<div style={{ maxWidth: "400px", margin: "24px 0" }}>
			<h2>Spending by Category</h2>
			<Pie data={data} options={options} />
		</div>
	);
}

export default SpendingChart;
