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
  paymentMethod,
  convertedTotal,
}) {
  const fullTotal = total + delivery;

  return (
    <div>
      <h3>🧾 Список товаров</h3>

      {products.length === 0 && <p>Корзина пуста</p>}

      {products.map((p, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <div>
            {index + 1}. Пиво {p.name} — {p.volume} л — {p.qty} шт: ฿{p.price * p.qty}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button style={{ width: 40, height: 40 }} onClick={() => onDecrease(index)}>-</button>

            <input
              type="number"
              value={p.qty}
              min={1}
              max={99999}
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value) || 1);
                onDecrease(index);
                for (let i = 1; i < value - p.qty; i++) onIncrease(index);
              }}
              style={{ width: 50, height: 40, fontSize: 16, textAlign: 'center' }}
            />

            <button style={{ width: 40, height: 40 }} onClick={() => onIncrease(index)}>+</button>
            <button style={{ width: 40, height: 40 }} onClick={() => onDelete(index)}>🗑</button>

            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
              <span style={{ fontSize: 14 }}>На складе: {p.stock ?? 0}</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
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
        🎁 Скидка: ฿{discount.toFixed(2)}{' '}
        ({discountType === 'percent' ? `${discountValue}%` : 'фикс.'})
      </div>

      <div style={{ fontWeight: 'bold', marginTop: 5 }}>
        💰 Итог с доставкой: ฿{Math.round(fullTotal)}
        {paymentMethod === 'usd' && convertedTotal && <> (${convertedTotal})</>}
      </div>
    </div>
  );
}
