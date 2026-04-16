const BASE_URL = "http://127.0.0.1:5000";

function getToken() {
	return sessionStorage.getItem("token");
}

function authHeaders() {
	const token = getToken();
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
}

export async function login(username, password) {
	const response = await fetch(`${BASE_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	});
	return response.json();
}

export async function getTransactions(category = null) {
	const url = category
		? `${BASE_URL}/transactions?category=${category}`
		: `${BASE_URL}/transactions`;
	const response = await fetch(url, { headers: authHeaders() });
	return response.json();
}

export async function addTransaction(data) {
	const response = await fetch(`${BASE_URL}/transactions`, {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify(data),
	});
	return response.json();
}

export async function getSummary() {
	const response = await fetch(`${BASE_URL}/summary`, {
		headers: authHeaders(),
	});
	return response.json();
}
