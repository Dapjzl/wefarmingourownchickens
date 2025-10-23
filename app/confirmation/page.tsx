"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Copy, MessageCircle } from "lucide-react"

interface Order {
  id: string
  customer: {
    name: string
    phone: string
    address: string
  }
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  total: number
  paymentProof: string
  status: string
  createdAt: string
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem("chickiemart-orders") || "[]")
      const foundOrder = orders.find((o: Order) => o.id === orderId)
      setOrder(foundOrder || null)
    }
  }, [orderId])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-8">We couldn't find your order. Please try again.</p>
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

      {/* Success Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-50/50 border-b border-green-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">Your order has been received and is being processed</p>
        </div>
      </section>

      {/* Confirmation Content */}
      <section className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Order ID */}
          <Card className="p-6 mb-6 bg-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="text-2xl font-bold font-mono">{order.id}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(order.id)}
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Customer Information */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Delivery Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{order.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{order.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{order.customer.address}</p>
                </div>
              </div>
            </Card>

            {/* Order Status */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Order Status</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <p className="font-medium capitalize">{order.status}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Proof</p>
                  <p className="font-medium text-sm">{order.paymentProof}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Items */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center pb-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">₦{order.total.toLocaleString()}</span>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 bg-secondary mb-6">
            <h2 className="text-lg font-bold mb-4">What's Next?</h2>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-sm">
                <span className="font-medium">Payment Confirmation:</span> Our team will verify your payment transfer
              </li>
              <li className="text-sm">
                <span className="font-medium">Order Processing:</span> Once confirmed, we'll prepare your order
              </li>
              <li className="text-sm">
                <span className="font-medium">Delivery:</span> You'll receive your fresh chicken at the address provided
              </li>
            </ol>
          </Card>

          {/* Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 border-primary/20">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">Contact our support team for any questions</p>
              <p className="text-sm font-medium">Phone: +234 (0) 123 456 7890</p>
              <p className="text-sm font-medium">Email: hello@chickiemart.com</p>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                WhatsApp Support
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Chat with us on WhatsApp for quick assistance</p>
              <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-green-600 hover:bg-green-700">Open WhatsApp</Button>
              </a>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/shop" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                Continue Shopping
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90">Back to Home</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
