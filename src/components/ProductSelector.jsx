import { useState } from "react";

export default function ProductSelector({ catalog, onAdd }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const filtered = catalog.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
  };

  const handleAdd = () => {
    if (!selectedProduct) return;

    onAdd({
      name: selectedProduct.name,
      volume: selectedProduct.volume,
      price: selectedProduct.price,
      qty,
    });

    // Сброс
    setSearchTerm("");
    setSelectedProduct(null);
    setQty(1);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>🛒 Добавить товар</h3>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSelectedProduct(null);
        }}
        placeholder="Введите название"
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          marginBottom: "8px",
        }}
      />

      {/* Подсказки */}
      {!selectedProduct && searchTerm && filtered.length > 0 && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 4,
            maxHeight: 200,
            overflowY: "auto",
            background: "#fff",
            zIndex: 999,
            position: "relative",
          }}
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              style={{
                padding: "8px 10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              {item.name} — ฿{item.price} ({item.stock} в наличии)
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>

            <span style={{ fontSize: "14px", color: "#888" }}>
              На складе: {selectedProduct.stock}
            </span>
          </div>

          <button
            onClick={handleAdd}
            style={{ marginTop: 10, padding: "8px 12px", fontSize: 16 }}
          >
            + Добавить продукт
          </button>
        </>
      )}
    </div>
  );
}