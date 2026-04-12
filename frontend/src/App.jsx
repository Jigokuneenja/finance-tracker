import React from "react";
import TransactionForm from "./components/TransactionForm";

function App() {
	const handleTransactionAdded = () => {
		console.log("Transaction added!");
	};

	return (
		<div>
			<h1>Finance Tracker</h1>
			<TransactionForm onTransactionAdded={handleTransactionAdded} />
		</div>
	);
}

export default App;
