export default function DiscountInput({
  discountValue,
  setDiscountValue,
  discountType,
  setDiscountType,
}) {
  const handleChange = (e) => {
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

  return (
    <div style={{ marginTop: 20 }}>
      <h4>🎁 Скидка</h4>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <input
          type="number"
          inputMode="numeric"
          value={discountValue}
          onChange={handleChange}
          placeholder="0"
          style={{
            width: "80px",
            fontSize: "16px",
            padding: "6px 8px",
            borderRadius: "4px",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label>
            <input
              type="radio"
              name="discountType"
              value="fixed"
              checked={discountType === "fixed"}
              onChange={() => setDiscountType("fixed")}
            />
            {" "}฿ Баты
          </label>

          <label>
            <input
              type="radio"
              name="discountType"
              value="percent"
              checked={discountType === "percent"}
              onChange={() => setDiscountType("percent")}
            />
            {" "}％ Проценты
          </label>
        </div>
      </div>
    </div>
  );
}