import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
	const [transactions, setTransactions] = useState([]);

	const fetchTransactions = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/transactions");
			const data = await response.json();
			setTransactions(data);
		} catch (err) {
			console.error("Could not fetch transactions", err);
		}
	};

	useEffect(() => {
		fetchTransactions();
	}, []);

	return (
		<div>
			<h1>Finance Tracker</h1>
			<TransactionForm onTransactionAdded={fetchTransactions} />
			<TransactionList transactions={transactions} />
		</div>
	);
}

export default App;
