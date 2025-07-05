import { useState } from "react";

export default function ProductSelector({ catalog, onAdd }) {
  const [search, setSearch] = useState("");

  const filtered = catalog.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (product) => {
    onAdd({
      name: product.name,
      volume: product.volume,
      price: product.price,
      qty: 1,
    });
    setSearch("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>🍚 Добавить товар</h3>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Введите название..."
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "6px",
        }}
        autoComplete="off"
        inputMode="text"
      />

      {search && filtered.length > 0 && (
        <div
          style={{
            marginTop: 8,
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#222",
            maxHeight: 150,
            overflowY: "auto",
          }}
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #333",
              }}
            >
              {item.name} — ฿{item.price} ({item.stock} в наличии)
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
