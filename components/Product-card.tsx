import Link from "next/link"; 
import Stripe from "stripe";
import Image from "next/image";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link 
      href={`/product/${product.id}`} 
      className="block group"
    >
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
        {/* Product Image */}
        {product.images && product.images[0] && (
          <div className="relative w-full h-64">
            <Image
              alt={product.name}
              src={product.images[0]}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Product Details Overlay */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-100">{product.name}</h3>
          {price?.unit_amount && (
            <p className="text-md font-bold text-gray-300 mt-2">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
