"use client"
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";

export default function Checkout() {
  const { items } = useCartStore();
  
  const total = items.reduce((acc, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0; 

    return acc + price * quantity;
  }, 0);

  if (total === 0 || items.length === 0) {
    return (
      <div>
        <h1>Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Checkout</h1>
      
      {/* Cart Items List */}
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id || `${item.name}-${item.quantity}`} className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="flex items-center">
              {item.imageUrl && (
                <Image 
                width={450}
                height={450}
                src={item.imageUrl} 
                alt={item.name} className="object-cover w-20 h-20 mr-4 rounded-lg" />
              )}
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Price: ${(item.price / 100).toFixed(2)}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="text-lg font-bold">
              ${(item.price * item.quantity / 100).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Total Price */}
      <div className="flex justify-between mt-6 text-xl font-semibold">
        <span>Total</span>
        <span>${(total / 100).toFixed(2)}</span>
      </div>
    </div>
  );
}
