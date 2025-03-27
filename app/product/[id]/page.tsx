import { stripe } from "@/lib/stripe";
import { ProductDetail } from "@/components/Product-detail";

export default async function ProductPage({ params }: { params: { id: string } }) {

  console.log("Params ID:", params.id);

  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });

    console.log("Product fetched:", product); // Debugging

    return <ProductDetail product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div className="text-center text-red-500">Product not found.</div>;
  }

  
}
