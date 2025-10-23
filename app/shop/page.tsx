"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart } from "lucide-react"

const allProducts = [
  {
    id: "1",
    name: "Chicken Breast",
    price: 2500,
    weight: "500g",
    image: "/fresh-chicken-breast.jpg",
    description: "Lean and tender chicken breast, perfect for grilling and frying",
  },
  {
    id: "2",
    name: "Chicken Thighs",
    price: 2000,
    weight: "500g",
    image: "/chicken-thighs.jpg",
    description: "Juicy and flavorful chicken thighs ideal for stews and soups",
  },
  {
    id: "3",
    name: "Whole Chicken",
    price: 4500,
    weight: "1.5kg",
    image: "/whole-fresh-chicken.jpg",
    description: "Complete whole chicken perfect for family meals and roasting",
  },
  {
    id: "4",
    name: "Chicken Wings",
    price: 1800,
    weight: "500g",
    image: "/crispy-chicken-wings.png",
    description: "Crispy wings perfect for frying, baking, or grilling",
  },
  {
    id: "5",
    name: "Chicken Drumsticks",
    price: 1600,
    weight: "500g",
    image: "/grilled-chicken-drumsticks.png",
    description: "Tender drumsticks great for any recipe and cooking method",
  },
  {
    id: "6",
    name: "Mixed Cuts",
    price: 3000,
    weight: "1kg",
    image: "/mixed-chicken-cuts.png",
    description: "Assorted cuts for variety in your meals and recipes",
  },
  {
    id: "7",
    name: "Chicken Gizzard",
    price: 1200,
    weight: "500g",
    image: "/chicken-gizzard.jpg",
    description: "Fresh gizzard for traditional and special recipes",
  },
  {
    id: "8",
    name: "Chicken Liver",
    price: 1400,
    weight: "500g",
    image: "/chicken-liver.png",
    description: "Premium liver for nutritious and delicious meals",
  },
  {
    id: "9",
    name: "Boneless Chicken",
    price: 3200,
    weight: "1kg",
    image: "/boneless-chicken.jpg",
    description: "Convenient boneless cuts for quick meal preparation",
  },
]

export default function ShopPage() {
  const { addItem } = useCart()
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
      quantity: 1,
    })

    // Show feedback
    setAddedItems((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">Browse our selection of fresh, quality chicken cuts</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">{product.weight}</span>
                    <span className="text-xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full transition-all ${
                      addedItems.has(product.id) ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    {addedItems.has(product.id) ? (
                      <span className="flex items-center gap-2">
                        <span>✓</span> Added to Cart
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </span>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
