import { stripe } from "@/lib/stripe";
import { ProductDetail } from "@/components/Product-detail";

export default async function ProductPage({ params }: { params: { id: string } }) {
  
  console.log("Params ID:", params.id); // Debugging

  if (!params.id) {
    return <div className="text-center text-red-500">Product ID is missing.</div>;
  }

  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });

    console.log("Product fetched:", product); // Debugging

    // Create a plain object instead of stringifying
    const plainProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      default_price: product.default_price,
    };

    return <ProductDetail product={plainProduct} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div className="text-center text-red-500">Product not found.</div>;
  }
}
