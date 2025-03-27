import Link from "next/link";

export const Navbar = () => {
  return ( 
    <nav className="p-12 text-gray-200 bg-gray-900 shadow-lg">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2xl font-semibold tracking-wide text-white">
          My Ecommerce
        </Link>
        <div className="flex space-x-8">
          <Link href="/" className="transition duration-300 hover:text-blue-400">Home</Link>
          <Link href="/product" className="transition duration-300 hover:text-blue-400">Product</Link>
          <Link href="/checkout" className="transition duration-300 hover:text-blue-400">Checkout</Link>
        </div>
      </div>
    </nav>
  );
};
