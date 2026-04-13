import React from "react";

const CATEGORIES = [
	"all",
	"food",
	"rent",
	"transport",
	"entertainment",
	"income",
	"other",
];

function FilterBar({ selected, onSelect }) {
	return (
		<div style={{ display: "flex", gap: "8px", margin: "16px 0" }}>
			{CATEGORIES.map((cat) => (
				<button
					key={cat}
					onClick={() => onSelect(cat)}
					style={{
						padding: "6px 14px",
						borderRadius: "99px",
						border: "0.5px solid",
						cursor: "pointer",
						fontWeight: selected === cat ? "500" : "400",
						background: selected === cat ? "#1a1a18" : "transparent",
						color: selected === cat ? "#ffffff" : "inherit",
						borderColor: selected === cat ? "#1a1a18" : "#ccc",
					}}
				>
					{cat.charAt(0).toUpperCase() + cat.slice(1)}
				</button>
			))}
		</div>
	);
}

export default FilterBar;
