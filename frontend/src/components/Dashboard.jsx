import React from "react";

function Dashboard({ summary }) {
	if (!summary || !summary.total_income) {
		return <p>Loading summary...</p>;
	}

	return (
		<div style={{ display: "flex", gap: "16px", merginBottom: "24px" }}>
			<div style={cardStyle("#E1F5EE", "#0F6E56")}>
				<p style={labelStyle}>Total Income</p>
				<p style={valueStyle}>${summary.total_income.toFixed(2)}</p>
			</div>
			<div style={cardStyle("#FCEBEB", "#A32D2D")}>
				<p style={labelStyle}>Total Expenses</p>
				<p style={valueStyle}>${summary.total_expenses.toFixed(2)}</p>
			</div>
			<div style={cardStyle("#E6F1FB", "#185FA5")}>
				<p style={labelStyle}>Balance</p>
				<p style={valueStyle}>${summary.balance.toFixed(2)}</p>
			</div>
		</div>
	);
}

const cardStyle = (bg, color) => ({
	background: bg,
	borderRadius: "8px",
	padding: "16px 24px",
	flex: 1,
	color,
});

const labelStyle = {
	fontSize: "13px",
	margin: "0 0 4px",
	fontWeight: "500",
};

const valueStyle = {
	fontSize: "24px",
	fontWeight: "500",
	margin: 0,
};

export default Dashboard;
