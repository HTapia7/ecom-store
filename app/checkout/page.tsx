"use client";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";

export default function Checkout() {
  const { items, addItem, removeItem, clearCart } = useCartStore();

  const total = items.reduce((acc, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    return acc + price * quantity;
  }, 0);

  if (total === 0 || items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Checkout</h1>

      {/* Cart Items List */}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id || `${item.name}-${item.quantity}`}
            className="flex items-center justify-between p-4 border-b border-gray-300"
          >
            <div className="flex items-center gap-4">
              {item.imageUrl && (
                <Image
                  width={80}
                  height={80}
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover rounded-lg"
                />
              )}

              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-500">${(item.price / 100).toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="w-10 h-10 text-lg font-bold transition bg-gray-200 rounded-lg dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => removeItem(item.id)}
              >
                -
              </button>
              <span className="text-xl font-semibold">{item.quantity}</span>
              <button
                className="w-10 h-10 text-lg font-bold transition bg-gray-200 rounded-lg dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => addItem({ ...item, quantity: 1 })}
              >
                +
              </button>
            </div>

            <div className="text-lg font-bold">
              ${(item.price * item.quantity / 100).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Total Price & Clear Cart Button */}
      <div className="flex justify-between mt-6 text-xl font-semibold">
        <span>Total</span>
        <span>${(total / 100).toFixed(2)}</span>
      </div>

      <button
        className="w-full py-3 mt-6 text-lg font-bold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
        onClick={clearCart}
      >
        Clear Cart
      </button>
    </div>
  );
}
