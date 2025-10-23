import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Zap, Truck } from "lucide-react"

const featuredProducts = [
  {
    id: "1",
    name: "Chicken Breast",
    price: 2500,
    weight: "500g",
    image: "/fresh-chicken-breast.jpg",
    description: "Lean and tender chicken breast, perfect for grilling",
  },
  {
    id: "2",
    name: "Chicken Thighs",
    price: 2000,
    weight: "500g",
    image: "/chicken-thighs.jpg",
    description: "Juicy and flavorful chicken thighs for stews",
  },
  {
    id: "3",
    name: "Whole Chicken",
    price: 4500,
    weight: "1.5kg",
    image: "/whole-fresh-chicken.jpg",
    description: "Complete whole chicken for family meals",
  },
  {
    id: "4",
    name: "Chicken Wings",
    price: 1800,
    weight: "500g",
    image: "/crispy-chicken-wings.png",
    description: "Crispy wings perfect for frying or baking",
  },
  {
    id: "5",
    name: "Chicken Drumsticks",
    price: 1600,
    weight: "500g",
    image: "/grilled-chicken-drumsticks.png",
    description: "Tender drumsticks great for any recipe",
  },
  {
    id: "6",
    name: "Mixed Cuts",
    price: 3000,
    weight: "1kg",
    image: "/mixed-chicken-cuts.png",
    description: "Assorted cuts for variety in your meals",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Fresh Chicken, Delivered Fast</h1>
              <p className="text-lg md:text-xl opacity-95 mb-8 text-balance">
                Order quality chicken cuts without stress. Fresh, affordable, and delivered to your doorstep.
              </p>
              <Link href="/shop">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Shop Now
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="/fresh-chicken-delivery.jpg"
                alt="Fresh chicken"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Fresh Quality</h3>
                <p className="text-muted-foreground">Sourced fresh daily from trusted suppliers</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Affordable Prices</h3>
                <p className="text-muted-foreground">Best prices without compromising quality</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Fast Delivery</h3>
                <p className="text-muted-foreground">Quick delivery to your location</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground">Explore our selection of fresh chicken cuts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">{product.weight}</span>
                    <span className="text-xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                  </div>
                  <Link href="/shop">
                    <Button className="w-full bg-primary hover:bg-primary/90">View Details</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
