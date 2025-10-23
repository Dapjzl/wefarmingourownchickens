"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { Trash2, Plus, Minus } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.weight}</p>
                        <p className="text-lg font-bold text-primary">₦{item.price.toLocaleString()}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/shop">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 mb-3">Proceed to Checkout</Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <Link href="/shop" className="w-full">
                    Continue Shopping
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
