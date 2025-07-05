// ✅ components/PaymentMethodSelect.jsx
export default function PaymentMethodSelect({ paymentMethod, setPaymentMethod }) {
  return (
    <div style={{ marginTop: 20 }}>
      <label>
        💳 Способ оплаты:
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          <option value="cash">💵 Наличные (в батах)</option>
          <option value="usd">💲 Доллары (по курсу)</option>
          <option value="card">💳 Карта</option>
        </select>
      </label>
    </div>
  );
}
