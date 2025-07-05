import { useState } from "react";

export default function ProductSelector({ catalog, onAdd }) {
  const [search, setSearch] = useState("");

  const filtered = catalog.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (product) => {
    onAdd({ ...product, qty: 1 });
    setSearch("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
        🛒 Добавить товар
      </h3>

      <input
        type="text"
        placeholder="Введите название..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 10px",
          fontSize: "16px",
          height: "40px",
          borderRadius: "8px",
          border: "1px solid #444",
          background: "#111",
          color: "#fff",
          marginBottom: 10,
        }}
      />

      {search &&
        filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => handleSelect(p)}
            style={{
              padding: "8px 10px",
              background: "#222",
              borderRadius: 8,
              cursor: "pointer",
              marginBottom: 6,
            }}
          >
            {p.name} — ฿{p.price} ({p.stock} в наличии)
          </div>
        ))}
    </div>
  );
}