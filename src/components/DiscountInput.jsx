// src/components/DiscountInput.jsx
export default function DiscountInput({
  discountValue,
  setDiscountValue,
  discountType,
  setDiscountType,
}) {
  const handleValueChange = (e) => {
    let value = e.target.value;

    if (value === "") {
      setDiscountValue("");
      return;
    }

    const num = Number(value);
    if (isNaN(num)) return;

    if (discountType === "percent") {
      if (num < 0) setDiscountValue(0);
      else if (num > 100) setDiscountValue(100);
      else setDiscountValue(num);
    } else {
      setDiscountValue(Math.max(0, num));
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setDiscountType(newType);

    // если переключили на проценты и значение больше 100 — ограничим
    if (newType === "percent" && discountValue > 100) {
      setDiscountValue(100);
    }
  };

  return (
    <div style={{ marginTop: 25 }}>
      <h4 style={{ marginBottom: 8 }}>🎁 Скидка</h4>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input
          type="number"
          min="0"
          value={discountValue}
          onChange={handleValueChange}
          placeholder="0"
          style={{
            width: "80px",
            fontSize: "16px",
            padding: "5px 8px",
          }}
        />

        <select
          value={discountType}
          onChange={handleTypeChange}
          style={{ padding: "6px 10px", fontSize: "14px" }}
        >
          <option value="fixed">฿ Баты</option>
          <option value="percent">％ Проценты</option>
        </select>
      </div>
    </div>
  );
}