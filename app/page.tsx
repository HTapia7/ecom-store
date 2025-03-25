import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "@/components/Carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-900 to-gray-900">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-16">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h2 className="text-5xl font-extrabold leading-tight">
              Elevate Your Shopping Experience
            </h2>
            <p className="text-lg text-gray-300">
              Discover the latest trends and unbeatable prices.
            </p>
            <Button 
              asChild 
              variant="default" 
              className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-4 rounded-xl shadow-md"
            >
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <Image
              alt="Featured Product"
              width={500}
              height={500}
              className="rounded-2xl shadow-lg border-4 border-blue-500"
              src={products.data[0]?.images[0] || "/placeholder.jpg"}
            />
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 md:px-16">
          <h3 className="text-3xl font-semibold text-center mb-6">🔥 Trending Now</h3>
          <Carousel products={products.data} />
        </div>
      </section>
    </div>
  );
}
