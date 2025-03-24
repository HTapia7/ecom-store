import Link from "next/link";

export const Navbar = () => {
  return ( 
    <nav className="bg-gray-900 text-gray-200 p-12 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold tracking-wide text-white">
          My Ecommerce
        </Link>
        <div className="flex space-x-8">
          <Link href="/" className="hover:text-blue-400 transition duration-300">Home</Link>
          <Link href="/products" className="hover:text-blue-400 transition duration-300">Products</Link>
          <Link href="/checkout" className="hover:text-blue-400 transition duration-300">Checkout</Link>
        </div>
      </div>
    </nav>
  );
};
