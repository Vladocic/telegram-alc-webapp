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

            <input
                type="text"
                value={discountValue}
                onChange={handleChange}
                placeholder="Введите скидку"
                style={{ marginRight: 10 }}
            />

            <label>
                <input
                    type="radio"
                    name="discountType"
                    value="fixed"
                    checked={discountType === "fixed"}
                    onChange={() => setDiscountType("fixed")}
                />
                В батах
            </label>

            <label style={{ marginLeft: 10 }}>
                <input
                    type="radio"
                    name="discountType"
                    value="percent"
                    checked={discountType === "percent"}
                    onChange={() => setDiscountType("percent")}
                />
                В процентах
            </label>
        </div>
    );
}