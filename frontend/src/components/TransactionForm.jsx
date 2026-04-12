import React, { useState } from "react";

function TransactionForm({ onTransactionAdded }) {
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("other");
	const [date, setDate] = useState("");
	const [note, setNote] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!amount || !date) {
			setError("Ammount and date are required");
			return;
		}

		try {
			const response = await fetch("http://127.0.0.1:5000/transactions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: parseFloat(amount),
					category,
					date,
					note,
				}),
			});

			if (!response.ok) {
				setError("Failed to add transaction");
				return;
			}

			setAmount("");
			setCategory("other");
			setDate("");
			setNote("");
			onTransactionAdded();
		} catch (err) {
			setError("Could not connect to server");
		}
	};

	return (
		<div>
			<h2>Add Transaction</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<div>
					<label>Amount</label>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="25.99"
					/>
				</div>
				<div>
					<label>Category</label>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value={"food"}>Food</option>
						<option value={"rent"}>Rent</option>
						<option value={"transport"}>Transport</option>
						<option value={"entertainment"}>Entertainment</option>
						<option value={"income"}>Income</option>
						<option value={"other"}>Other</option>
					</select>
				</div>
				<div>
					<label>Date</label>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<div>
					<label>Note</label>
					<input
						type="text"
						value={note}
						onChange={(e) => setNote(e.target.value)}
						placeholder="Optional note"
					/>
				</div>
				<button type="submit">Add Transaction</button>
			</form>
		</div>
	);
}

export default TransactionForm;
