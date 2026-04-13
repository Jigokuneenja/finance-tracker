import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";
import SpendingChart from "./components/SpendingChart";
import FilterBar from "./components/FilterBar";
import { getTransactions, getSummary, addTransaction } from "./api";

function App() {
	const [transactions, setTransactions] = useState([]);
	const [summary, setSummary] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState("all");

	const fetchTransactions = async (category) => {
		try {
			const cat = category === "all" ? null : category;
			const data = await getTransactions(cat);
			setTransactions(data);
		} catch (err) {
			console.error("Could not fetch transactions", err);
		}
	};

	const fetchSummary = async () => {
		try {
			const data = await getSummary();
			setSummary(data);
		} catch (err) {
			console.error("Could not fetch summart", err);
		}
	};

	const handleTransactionAdded = async (data) => {
		await addTransaction(data);
		fetchTransactions(selectedCategory);
		fetchSummary();
	};

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		fetchTransactions(category);
	};

	useEffect(() => {
		fetchTransactions("all");
		fetchSummary();
	}, []);

	return (
		<div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
			<h1>Finance Tracker</h1>
			<Dashboard summary={summary} />
			<SpendingChart summary={summary} />
			<TransactionForm onTransactionAdded={handleTransactionAdded} />
			<FilterBar selected={selectedCategory} onSelect={handleCategorySelect} />
			<TransactionList transactions={transactions} />
		</div>
	);
}

export default App;
