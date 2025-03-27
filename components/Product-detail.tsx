import Stripe from "stripe";
import Image from "next/image";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const price = typeof product.default_price === "object" ? product.default_price : null;

  return (
    <div className="flex flex-col gap-4 p-4">
      {product.images?.[0] && (
        <div className="relative w-64 h-64">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        {product.description && <p className="text-gray-700 dark:text-gray-300">{product.description}</p>}

        {price?.unit_amount !== null && price?.unit_amount !== undefined && (
          <span className="mt-auto text-xl font-bold text-gray-900 dark:text-white">
            ${(price.unit_amount / 100).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};
