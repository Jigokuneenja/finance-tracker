import React from "react";

function TransactionList({ transactions }) {
	if (transactions.length === 0) {
		return <p>No transactions yet. Add one above</p>;
	}

	return (
		<div>
			<h2>Transactions</h2>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Category</th>
						<th>Amount</th>
						<th>Note</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => (
						<tr key={transaction.id}>
							<td>{transaction.date}</td>
							<td>{transaction.category}</td>
							<td>${transaction.amount.toFixed(2)}</td>
							<td>{transaction.note}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TransactionList;
