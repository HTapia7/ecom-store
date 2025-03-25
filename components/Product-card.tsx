import Link from "next/link";
import Stripe from "stripe";
import Image from "next/image";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  const description = product.description || "No description available.";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/product/${product.id}`} className="block">
        {/* Product Image */}
        {product.images && product.images[0] && (
          <div className="relative w-full h-64">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }} // ✅ Corrected
              className="rounded-t-lg"
            />
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`}>
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-500">
            {product.name}
          </h5>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>

        {/* Pricing */}
        {price?.unit_amount && (
          <span className="text-xl font-bold text-gray-900 dark:text-white mt-auto">
            ${(price.unit_amount / 100).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};
