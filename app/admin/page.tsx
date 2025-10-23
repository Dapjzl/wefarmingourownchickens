"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LogOut, Eye, EyeOff, CheckCircle, Clock, Package } from "lucide-react"

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
  status: "pending" | "confirmed" | "delivered"
  createdAt: string
}

const ADMIN_PASSWORD = "admin123"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "delivered">("all")
  const [error, setError] = useState("")

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders()
    }
  }, [isAuthenticated])

  const loadOrders = () => {
    const stored = localStorage.getItem("chickiemart-orders")
    if (stored) {
      setOrders(JSON.parse(stored))
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Invalid password")
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: "pending" | "confirmed" | "delivered") => {
    const updated = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updated)
    localStorage.setItem("chickiemart-orders", JSON.stringify(updated))
  }

  const filteredOrders = orders.filter((order) => (filter === "all" ? true : order.status === filter))

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-lg">🐔</span>
            </div>
            <h1 className="text-2xl font-bold">ChickieMart Admin</h1>
            <p className="text-muted-foreground mt-2">Secure Login</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Admin Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Login
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">Demo password: admin123</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">🐔</span>
            </div>
            <h1 className="text-xl font-bold">ChickieMart Admin</h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </Card>
          <Card className="p-4 border-yellow-200 bg-yellow-50">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </Card>
          <Card className="p-4 border-blue-200 bg-blue-50">
            <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
            <p className="text-3xl font-bold text-blue-600">{stats.confirmed}</p>
          </Card>
          <Card className="p-4 border-green-200 bg-green-50">
            <p className="text-sm text-muted-foreground mb-1">Delivered</p>
            <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
          </Card>
          <Card className="p-4 border-primary/20 bg-primary/5">
            <p className="text-sm text-muted-foreground mb-1">Revenue</p>
            <p className="text-3xl font-bold text-primary">₦{(stats.revenue / 1000).toFixed(0)}K</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "pending", "confirmed", "delivered"] as const).map((status) => (
            <Button
              key={status}
              onClick={() => setFilter(status)}
              variant={filter === status ? "default" : "outline"}
              className={
                filter === status
                  ? "bg-primary hover:bg-primary/90"
                  : "border-primary text-primary hover:bg-primary/10 bg-transparent"
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Orders Table */}
        <Card className="overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Items</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono">{order.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-sm">{order.customer.name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{order.items.length} items</td>
                      <td className="px-6 py-4 font-semibold">₦{order.total.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {order.status === "pending" && <Clock className="w-4 h-4 text-yellow-600" />}
                          {order.status === "confirmed" && <Package className="w-4 h-4 text-blue-600" />}
                          {order.status === "delivered" && <CheckCircle className="w-4 h-4 text-green-600" />}
                          <span className="text-sm capitalize">{order.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {order.status !== "confirmed" && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, "confirmed")}
                              className="bg-blue-600 hover:bg-blue-700 text-xs"
                            >
                              Confirm
                            </Button>
                          )}
                          {order.status !== "delivered" && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, "delivered")}
                              className="bg-green-600 hover:bg-green-700 text-xs"
                            >
                              Deliver
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
