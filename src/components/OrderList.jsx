import { useEffect, useState } from "react";

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

      {products.map((p, index) => {
        const [inputValue, setInputValue] = useState(p.qty.toString());

        useEffect(() => {
          setInputValue(p.qty.toString());
        }, [p.qty]);

        const handleInputChange = (e) => {
          const val = e.target.value;
          if (/^\d*$/.test(val)) {
            setInputValue(val);
          }
        };

        const handleInputBlur = () => {
          const num = parseInt(inputValue, 10);
          if (!isNaN(num)) {
            if (num < 1) {
              onDelete(index); // если 0 — удалить товар
            } else {
              onSetQty(index, num);
            }
          } else {
            setInputValue(p.qty.toString());
          }
        };

        return (
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
                <span style={centerText}>−</span>
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                inputMode="numeric"
                maxLength={5}
                style={inputStyle}
              />

              <button onClick={() => onIncrease(index)} style={buttonStyle}>
                <span style={centerText}>+</span>
              </button>

              <button onClick={() => onDelete(index)} style={buttonStyle}>
                <span style={centerText}>🗑</span>
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
        );
      })}

      <div style={{ marginTop: 10 }}>
        🚚 Доставка: {delivery === 0 ? "Бесплатно" : `฿${delivery}`}
      </div>

      <div>
        🎁 Скидка: ฿{discount.toFixed(2)} (
        {discountType === "percent" ? `${discountValue}%` : "фикс."})
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const inputStyle = {
  width: 50,
  height: 45,
  fontSize: 16,
  textAlign: "center",
  borderRadius: 10,
  background: "#111",
  color: "#fff",
  border: "1px solid #333",
};

const centerText = {
  lineHeight: "1",
  textAlign: "center",
};