"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCheckout } from "@/context/checkout-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentForm() {
  const { editingPayment, setEditingPayment, setIsEditingPayment, paymentMethods, setPaymentMethods } = useCheckout()

  const [activeTab, setActiveTab] = useState<"card" | "mobile">("card")
  const [formData, setFormData] = useState({
    id: "",
    type: "card",
    cardType: "VISA",
    cardNumber: "",
    nameOnCard: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    lastFour: "",
    expiryDate: "",
    mobileBankName: "Telebirr",
    mobileNumber: "",
  })

  useEffect(() => {
    if (editingPayment) {
      if (editingPayment.type === "card") {
        setActiveTab("card")
        setFormData({
          ...formData,
          id: editingPayment.id || "",
          type: "card",
          cardType: editingPayment.cardType || "VISA",
          lastFour: editingPayment.lastFour || "",
          expiryDate: editingPayment.expiryDate || "",
        })
      } else if (editingPayment.type === "mobile") {
        setActiveTab("mobile")
        setFormData({
          ...formData,
          id: editingPayment.id || "",
          type: "mobile",
          mobileBankName: editingPayment.mobileBankName || "Telebirr",
          mobileNumber: editingPayment.mobileNumber || "",
        })
      }
    }
  }, [editingPayment])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "cardNumber") {
      // Only allow numbers and limit to 16 digits
      const numbersOnly = value.replace(/\D/g, "").slice(0, 16)
      setFormData((prev) => ({
        ...prev,
        [name]: numbersOnly,
        lastFour: numbersOnly.slice(-4),
      }))
    } else if (name === "mobileNumber") {
      // Only allow numbers and limit to 10 digits
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10)
      setFormData((prev) => ({
        ...prev,
        [name]: numbersOnly,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleCardTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cardType: value }))
  }

  const handleMobileBankChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mobileBankName: value }))
  }

  const handleExpiryMonthChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      expiryMonth: value,
      expiryDate: `${value}/${prev.expiryYear}`,
    }))
  }

  const handleExpiryYearChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      expiryYear: value,
      expiryDate: `${prev.expiryMonth}/${value}`,
    }))
  }

  const handleCancel = () => {
    setIsEditingPayment(false)
    setEditingPayment(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeTab === "card") {
      const newPaymentMethod = {
        id: formData.id || `card-${Date.now()}`,
        type: "card" as const,
        cardType: formData.cardType,
        lastFour: formData.lastFour,
        expiryDate: `${formData.expiryMonth}/${formData.expiryYear}`,
      }

      if (formData.id && paymentMethods.some((method) => method.id === formData.id)) {
        // Update existing payment method
        setPaymentMethods(paymentMethods.map((method) => (method.id === formData.id ? newPaymentMethod : method)))
      } else {
        // Add new payment method
        setPaymentMethods([...paymentMethods, newPaymentMethod])
      }
    } else if (activeTab === "mobile") {
      const newPaymentMethod = {
        id: formData.id || `mobile-${Date.now()}`,
        type: "mobile" as const,
        mobileBankName: formData.mobileBankName,
        mobileNumber: formData.mobileNumber,
      }

      if (formData.id && paymentMethods.some((method) => method.id === formData.id)) {
        // Update existing payment method
        setPaymentMethods(paymentMethods.map((method) => (method.id === formData.id ? newPaymentMethod : method)))
      } else {
        // Add new payment method
        setPaymentMethods([...paymentMethods, newPaymentMethod])
      }
    }

    setIsEditingPayment(false)
    setEditingPayment(null)
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">{formData.id ? "Edit Payment Method" : "Add New Payment Method"}</h2>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "card" | "mobile")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Banking</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="card" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardType">Card Type</Label>
              <Select value={formData.cardType} onValueChange={handleCardTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VISA">Visa</SelectItem>
                  <SelectItem value="MASTERCARD">Mastercard</SelectItem>
                  <SelectItem value="AMEX">American Express</SelectItem>
                  <SelectItem value="DISCOVER">Discover</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="•••• •••• •••• ••••"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input id="nameOnCard" name="nameOnCard" value={formData.nameOnCard} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiration Date</Label>
                <div className="flex space-x-2">
                  <Select value={formData.expiryMonth} onValueChange={handleExpiryMonthChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, "0")
                        return (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>

                  <Select value={formData.expiryYear} onValueChange={handleExpiryYearChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = (new Date().getFullYear() + i).toString().slice(-2)
                        return (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} maxLength={4} required />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobileBankName">Mobile Banking Provider</Label>
              <Select value={formData.mobileBankName} onValueChange={handleMobileBankChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mobile banking provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Telebirr">Telebirr (Ethio Telecom)</SelectItem>
                  <SelectItem value="CBE Birr">CBE Birr (Commercial Bank of Ethiopia)</SelectItem>
                  <SelectItem value="Amole">Amole (Dashen Bank)</SelectItem>
                  <SelectItem value="HelloCash">HelloCash (Lion Bank)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="09XXXXXXXX"
                required
              />
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">How to pay with {formData.mobileBankName}:</p>
              <ol className="text-xs text-gray-600 list-decimal pl-4 space-y-1">
                <li>You'll receive a payment request on your mobile phone</li>
                <li>Enter your PIN to authorize the payment</li>
                <li>Wait for confirmation message</li>
                <li>Your order will be processed immediately</li>
              </ol>
            </div>
          </TabsContent>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Save Payment Method
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}
