export default function OrderList({
  products,
  total,
  delivery,
  discount,
  discountType,
  discountValue,
  onIncrease,
  onDecrease,
  onDelete,
  onToggleStock,
  onSetQty,
  paymentMethod,
  convertedTotal,
}) {
  const fullTotal = total + delivery;

  return (
    <div>
      <h3>🧾 Список товаров</h3>

      {products.length === 0 && <p>Корзина пуста</p>}

      {products.map((p, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <div>
            {index + 1}. Пиво {p.name} — {p.volume} л — {p.qty} шт: ฿{p.price * p.qty}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <button onClick={() => onDecrease(index)} style={buttonStyle}>
              -
            </button>

            <input
              type="number"
              value={p.qty}
              onChange={(e) => {
                const num = parseInt(e.target.value, 10);
                if (!isNaN(num) && num >= 1) {
                  onSetQty(index, num);
                }
              }}
              inputMode="numeric"
              min="1"
              max="99999"
              style={{
                width: 55,
                height: 45,
                fontSize: 16,
                textAlign: "center",
                borderRadius: 10,
                background: "#111",
                color: "#fff",
                border: "1px solid #333",
              }}
            />

            <button onClick={() => onIncrease(index)} style={buttonStyle}>
              +
            </button>

            <button onClick={() => onDelete(index)} style={buttonStyle}>
              🗑
            </button>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ fontSize: 14 }}>На складе: {p.stock}</div>
              <label style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <input
                  type="checkbox"
                  checked={Boolean(p.fromStock)}
                  onChange={() => onToggleStock(index)}
                />
                Со склада
              </label>
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 10 }}>
        🚚 Доставка: {delivery === 0 ? "Бесплатно" : `฿${delivery}`}
      </div>

      <div>
        🎁 Скидка: ฿{discount.toFixed(2)} ({discountType === "percent" ? `${discountValue}%` : "фикс."})
      </div>

      <div style={{ fontWeight: "bold", marginTop: 5 }}>
        💰 Итог с доставкой: ฿{Math.round(fullTotal)}
        {paymentMethod === "usd" && convertedTotal && <> (${convertedTotal})</>}
      </div>
    </div>
  );
}

const buttonStyle = {
  width: 45,
  height: 45,
  fontSize: 18,
  borderRadius: 10,
  background: "#111",
  color: "#fff",
  border: "none",
};