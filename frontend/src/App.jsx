import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";
import SpendingChart from "./components/SpendingChart";
import FilterBar from "./components/FilterBar";
import LoginPage from "./pages/LoginPage";
import { getTransactions, getSummary, addTransaction } from "./api";

function App() {
	const [transactions, setTransactions] = useState([]);
	const [summary, setSummary] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
			fetchTransactions("all");
			fetchSummary();
		}
	}, []);

	const handleLogin = (token) => {
		console.log(token);
		sessionStorage.setItem("token", token);
		setIsLoggedIn(true);
	};

	useEffect(() => {
		if (isLoggedIn) {
			fetchTransactions("all");
			fetchSummary();
		}
	}, [isLoggedIn]);

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setIsLoggedIn(false);
	};

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

	if (!isLoggedIn) {
		return <LoginPage onLogin={handleLogin} />;
	}

	return (
		<div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h1>Finance Tracker</h1>
				<button onClick={handleLogout} style={{ cursor: "pointer" }}>
					Log out
				</button>
			</div>
			<Dashboard summary={summary} />
			<SpendingChart summary={summary} />
			<TransactionForm onTransactionAdded={handleTransactionAdded} />
			<FilterBar selected={selectedCategory} onSelect={handleCategorySelect} />
			<TransactionList transactions={transactions} />
		</div>
	);
}

export default App;
