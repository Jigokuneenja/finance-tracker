const BASE_URL = "http://127.0.0.1:5000";

export async function getTransactions(category = null) {
	const url = category
		? `${BASE_URL}/transactions?category=${category}`
		: `${BASE_URL}/transactions`;
	const response = await fetch(url);
	return response.json();
}

export async function addTransaction(data) {
	const response = await fetch(`${BASE_URL}/transactions`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return response.json();
}

export async function getSummary() {
	const response = await fetch(`${BASE_URL}/summary`);
	return response.json();
}
