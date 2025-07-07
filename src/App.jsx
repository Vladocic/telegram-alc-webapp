import { useEffect, useState } from "react";
import DiscountInput from "./components/DiscountInput";
import OrderList from "./components/OrderList";
import PaymentMethodSelect from "./components/PaymentMethodSelect";
import ProductSelector from "./components/ProductSelector";
import { calculateDelivery } from "./utils/delivery";

function App() {
  const tg = window.Telegram?.WebApp;

  const catalog = [
    { id: 1, name: "Heineken", volume: 0.62, price: 156, stock: 8 },
    { id: 2, name: "Corona", volume: 0.33, price: 138, stock: 12 },
  ];

  const [products, setProducts] = useState([]);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState("fixed");
  const [rawTotal, setRawTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const delivery = calculateDelivery(rawTotal);
  const exchangeRate = 33;
  const convertedTotal =
    paymentMethod === "usd"
      ? ((total + delivery) / exchangeRate).toFixed(2)
      : null;

  useEffect(() => {
    const sum = products.reduce((acc, item) => acc + item.price * item.qty, 0);
    setRawTotal(sum);

    const calcDiscount =
      discountType === "percent"
        ? (sum * (discountValue || 0)) / 100
        : discountValue || 0;

    setDiscount(calcDiscount);
    setTotal(Math.max(sum - calcDiscount, 0));
  }, [products, discountValue, discountType]);

  useEffect(() => {
    if (!tg) return;

    const handleClick = async () => {
      const payload = {
        products,
        discount,
        delivery,
        total: total + delivery,
        paymentMethod,
        chat_id: tg.initDataUnsafe.user?.id,

      };

      try {
        const response = await fetch("http://localhost:8000/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Ошибка при оформлении заказа");
        }

        tg.close(); 
      } catch (error) {
        alert("❌ Не удалось оформить заказ");
        console.error(error);
      }
    };

    tg.MainButton.setParams({ text: "Оформить заказ" });
    tg.MainButton.show();
    tg.MainButton.onClick(handleClick);

    return () => {
      tg.MainButton.offClick(handleClick);
    };
  }, [products, discount, total, delivery, paymentMethod]);

  const handleAddProduct = (product) => {
    setProducts((prev) => {
      const existing = prev.find(
        (p) =>
          p.name === product.name &&
          p.volume === product.volume &&
          p.price === product.price
      );
      if (existing) {
        return prev.map((p) =>
          p === existing
            ? {
              ...p,
              qty: p.qty + product.qty,
              fromStock: p.fromStock ?? false,
            }
            : p
        );
      } else {
        return [...prev, { ...product, fromStock: false }];
      }
    });
  };

  const increaseQty = (index) => {
    setProducts((prev) => {
      const updated = [...prev];
      updated[index].qty += 1;
      return updated;
    });
  };

  const decreaseQty = (index) => {
    setProducts((prev) => {
      const updated = [...prev];
      if (updated[index].qty > 1) {
        updated[index].qty -= 1;
      } else {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  const deleteProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleStockSource = (index) => {
    setProducts((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, fromStock: !p.fromStock } : p
      )
    );
  };

  const setQty = (index, value) => {
    setProducts((prev) => {
      const updated = [...prev];
      updated[index].qty = value;
      return updated;
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <ProductSelector catalog={catalog} onAdd={handleAddProduct} />

      <OrderList
        products={products}
        total={total}
        delivery={delivery}
        discount={discount}
        discountType={discountType}
        discountValue={discountValue}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onDelete={deleteProduct}
        onToggleStock={toggleStockSource}
        onSetQty={setQty}
        paymentMethod={paymentMethod}
        convertedTotal={convertedTotal}
      />

      <DiscountInput
        discountValue={discountValue}
        setDiscountValue={setDiscountValue}
        discountType={discountType}
        setDiscountType={setDiscountType}
      />

      <PaymentMethodSelect
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </div>
  );
}

export default App;