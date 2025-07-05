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
    convertedTotal
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
                    <div style={{ fontSize: '14px', color: '#ccc', marginTop: 2 }}>
                        На складе: {p.stock ?? "-"}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <button onClick={() => onDecrease(index)}>-</button>
                        <span>{p.qty}</span>
                        <button onClick={() => onIncrease(index)}>+</button>
                        <button onClick={() => onDelete(index)}>🗑</button>
                    </div>

                    <div style={{ marginTop: 5 }}>
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
            ))}

            <div style={{ marginTop: 10 }}>
                🚚 Доставка: {delivery === 0 ? "Бесплатно" : `฿${delivery}`}
            </div>

            <div>
                🎁 Скидка: ฿{discount.toFixed(2)}{" "}
                ({discountType === "percent" ? `${discountValue}%` : "фикс."})
            </div>

            <div style={{ fontWeight: "bold", marginTop: 5 }}>
                💰 Итог с доставкой: ฿{Math.round(fullTotal)}
                {paymentMethod === "usd" && convertedTotal && (
                    <> (${convertedTotal})</>
                )}
            </div>
        </div>
    );
}