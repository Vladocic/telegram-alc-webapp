export default function DiscountInput({
  discountValue,
  setDiscountValue,
  discountType,
  setDiscountType,
}) {
  const handleValueChange = (e) => {
    let value = e.target.value;

    // Только цифры
    if (!/^[0-9]*$/.test(value)) return;

    // Удалить лидирующие нули, кроме одиночного 0
    value = value.replace(/^0+(?!$)/, "");

    if (value === "") {
      setDiscountValue("");
      return;
    }

    const num = Number(value);

    if (discountType === "percent") {
      if (num > 100) setDiscountValue(100);
      else setDiscountValue(num);
    } else {
      setDiscountValue(Math.max(0, num));
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setDiscountType(newType);

    if (newType === "percent" && discountValue > 100) {
      setDiscountValue(100);
    }
  };

  return (
    <div style={{ marginTop: 25 }}>
      <h4 style={{ marginBottom: 8 }}>🎁 Скидка</h4>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={discountValue}
          onChange={handleValueChange}
          placeholder="0"
          style={{
            width: "80px",
            fontSize: "16px", // iOS: предотвращает zoom
            padding: "6px 10px",
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