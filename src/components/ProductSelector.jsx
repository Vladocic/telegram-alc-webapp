// src/components/ProductSelector.jsx
import { useState } from "react";

export default function ProductSelector({ catalog, onAdd }) {
  const [search, setSearch] = useState("");

  const filteredCatalog = catalog.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (product) => {
    onAdd({
      name: product.name,
      volume: product.volume,
      price: product.price,
      qty: 1,
      stock: product.stock,
    });
    setSearch("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>🛒 Добавить товар</h3>
      <input
        type="text"
        placeholder="Введите название..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />

      {search && (
        <div
          style={{
            marginTop: 10,
            border: "1px solid #555",
            borderRadius: 5,
            background: "#222",
            maxHeight: 150,
            overflowY: "auto",
          }}
        >
          {filteredCatalog.map((item) => (
            <div
              key={item.id}
              onClick={() => handleAdd(item)}
              style={{
                padding: 8,
                cursor: "pointer",
                borderBottom: "1px solid #444",
              }}
            >
              {item.name} — ₹{item.price} ({item.stock} в наличии)
            </div>
          ))}
          {filteredCatalog.length === 0 && (
            <div style={{ padding: 8, color: "#888" }}>Нет товаров</div>
          )}
        </div>
      )}
    </div>
  );
}
