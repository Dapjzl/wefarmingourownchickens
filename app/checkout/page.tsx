"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { Upload, AlertCircle } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentProof: null as File | null,
  })

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add items to your cart before checking out</p>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, paymentProof: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your name")
      return
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number")
      return
    }
    if (!formData.address.trim()) {
      setError("Please enter your delivery address")
      return
    }

    setLoading(true)

    try {
      // Simulate order submission
      const orderData = {
        id: `ORD-${Date.now()}`,
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        },
        items: items,
        total: total,
        paymentProof: formData.paymentProof?.name || "No proof uploaded",
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      // Store order in localStorage for demo
      const orders = JSON.parse(localStorage.getItem("chickiemart-orders") || "[]")
      orders.push(orderData)
      localStorage.setItem("chickiemart-orders", JSON.stringify(orders))

      // Clear cart and redirect
      clearCart()
      router.push(`/confirmation?orderId=${orderData.id}`)
    } catch (err) {
      setError("Failed to submit order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-secondary border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Delivery Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete delivery address"
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </Card>

                {/* Payment Information */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                  <div className="bg-secondary p-4 rounded-lg mb-6">
                    <p className="text-sm text-muted-foreground mb-3">Transfer payment to the account below:</p>
                    <div className="space-y-2 font-mono text-sm">
                      <div>
                        <span className="text-muted-foreground">Bank:</span>
                        <span className="ml-2 font-semibold">First Bank</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Account Name:</span>
                        <span className="ml-2 font-semibold">ChickieMart</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Account Number:</span>
                        <span className="ml-2 font-semibold">1234567890</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Payment Proof (Optional)</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        className="hidden"
                        id="payment-proof"
                      />
                      <label htmlFor="payment-proof" className="cursor-pointer block">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium">
                          {formData.paymentProof ? formData.paymentProof.name : "Click to upload payment proof"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, or PDF (Max 5MB)</p>
                      </label>
                    </div>
                  </div>
                </Card>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
                >
                  {loading ? "Processing..." : "Confirm Order"}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium">TBD</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Delivery cost will be confirmed after order submission
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
