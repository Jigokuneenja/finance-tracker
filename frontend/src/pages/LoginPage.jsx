import React, { useState } from "react";

function LoginPage({ onLogin }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("http://127.0.0.1:5000/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError("Invalid username or password");
				return;
			}

			onLogin(data.token);
		} catch (err) {
			setError("Could not connect to server");
		}
	};

	return (
		<div style={containerStyle}>
			<div style={cardStyle}>
				<h1 style={{ marginBottom: "8px" }}>Finance Tracker</h1>
				<p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>
					Personal finance - local only
				</p>
				{error && (
					<p
						style={{ color: "#A32D2D", marginBottom: "16px", fontSize: "14px" }}
					>
						{error}
					</p>
				)}
				<form onSubmit={handleSubmit}>
					<div style={fieldStyle}>
						<label style={labelStyle}>Username</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							style={inputStyle}
							autoFocus
						/>
					</div>
					<div style={fieldStyle}>
						<label style={labelStyle}>Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							style={inputStyle}
						/>
					</div>
					<button type="submit" style={buttonStyle}>
						Log in
					</button>
				</form>
			</div>
		</div>
	);
}

const containerStyle = {
	minHeight: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	background: "#f5f4f0",
};

const cardStyle = {
	background: "#ffffff",
	borderRadius: "12px",
	padding: "40px",
	width: "100%",
	maxWidth: "360px",
	border: "0.5px solid #e0e0e0",
};

const fieldStyle = {
	marginBottom: "16px",
};

const labelStyle = {
	display: "block",
	fontSize: "13px",
	fontWeight: "500",
	marginBottom: "6px",
};

const inputStyle = {
	width: "100%",
	padding: "8px 12px",
	borderRadius: "6px",
	border: "0.5px solid #ccc",
	fontSize: "14px",
};

const buttonStyle = {
	width: "100%",
	padding: "10px",
	borderRadius: "6px",
	background: "#1a1a18",
	color: "#ffffff",
	border: "none",
	fontSize: "14px",
	fontWeight: "500",
	cursor: "pointer",
	marginTop: "8px",
};

export default LoginPage;
