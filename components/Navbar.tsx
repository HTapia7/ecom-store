"use client"
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa"; // For a shopping cart icon

export const Navbar = () => {
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="p-6 text-gray-200 bg-gray-900 shadow-lg">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2xl font-semibold tracking-wide text-white">
          My Ecommerce
        </Link>
        <div className="flex space-x-8">
          <Link href="/" className="transition duration-300 hover:text-blue-400">Home</Link>
          <Link href="/product" className="transition duration-300 hover:text-blue-400">Product</Link>
          <Link href="/checkout" className="transition duration-300 hover:text-blue-400">Checkout</Link>

          {/* Cart Icon */}
          <div className="relative">
            <Link href="/checkout" className="flex items-center text-2xl text-white hover:text-blue-400">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 -mt-2 -mr-2 text-xs font-semibold text-white bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
