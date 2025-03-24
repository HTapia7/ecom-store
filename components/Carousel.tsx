"use client"
import Stripe from "stripe"
import { Card, CardContent, CardTitle } from "./ui/card"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [products.length])

  const currentProduct = products[current]
  const price = currentProduct.default_price as Stripe.Price

  return (
    <Card className="relative w-full max-w-xl mx-auto overflow-hidden rounded-lg shadow-lg">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative w-full h-64">
          <Image
            alt={currentProduct.name}
            src={currentProduct.images[0]}
            fill
            className="object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-4">
            <CardTitle className="text-white text-lg">{currentProduct.name}</CardTitle>
          </div>
        </div>
      )}
      <CardContent className="p-4 text-center">
        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-900">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
