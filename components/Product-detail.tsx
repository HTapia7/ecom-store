"use client"
import Stripe from "stripe";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = typeof product.default_price === "object" ? product.default_price : null;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price?.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  const onRemoveItem = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-8 p-8 md:flex-row">
      {product.images?.[0] && (
        <div className="relative w-full max-w-lg h-96">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      )}
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
        {product.description && (
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{product.description}</p>
        )}
        {price?.unit_amount !== null && price?.unit_amount !== undefined && (
          <span className="block mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            ${(price.unit_amount / 100).toFixed(2)}
          </span>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            className="flex items-center justify-center w-10 h-10 text-lg font-bold transition bg-gray-200 rounded-lg dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={onRemoveItem}
          >
            -
          </button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button
            className="flex items-center justify-center w-10 h-10 text-lg font-bold transition bg-gray-200 rounded-lg dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={onAddItem}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
