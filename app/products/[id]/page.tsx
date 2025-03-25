import { stripe } from "@/lib/stripe"

export default async function ProductPage({params}: {params: {id: string}}) {
  const product = stripe.products.retrieve(paramid, {
    expand: ["default_price"]
  })
  return (
      <ProductDetail/>
  )
}