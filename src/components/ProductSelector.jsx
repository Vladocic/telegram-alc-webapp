import { useState } from "react";

export default function ProductSelector({ catalog, onAdd }) {
    const [selectedId, setSelectedId] = useState(catalog[0].id);
    const [qty, setQty] = useState(1);

    const selectedProduct = catalog.find(p => p.id === selectedId);

    const handleAdd = () => {
        onAdd({
            name: selectedProduct.name,
            volume: selectedProduct.volume,
            price: selectedProduct.price,
            qty,
        });
        setQty(1);
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <h3>🛒 Добавить товар</h3>

            <select
                value={selectedId}
                onChange={(e) => setSelectedId(Number(e.target.value))}
            >
                {catalog.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name} — ฿{item.price} ({item.stock} в наличии)
                    </option>
                ))}
            </select>

            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
                <span style={{ fontSize: '14px', color: '#ccc' }}>
                    На складе: {selectedProduct.stock}
                </span>
            </div>
            <button onClick={handleAdd} style={{ marginTop: 10 }}>
                + Добавить продукт
            </button>
        </div>
    );
}