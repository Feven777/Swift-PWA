"use client"

import type React from "react"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Phone, Mail } from "lucide-react"
import ProfileSidebar from "@/components/profile-sidebar"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SupportPage() {
  const [liveChatOpen, setLiveChatOpen] = useState(false)
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: "",
  })
  const [chatMessages, setChatMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! How can I help you today?", isUser: false },
  ])
  const [chatInput, setChatInput] = useState("")

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    // Add user message
    setChatMessages((prev) => [...prev, { text: chatInput, isUser: true }])

    // Clear input
    setChatInput("")

    // Simulate response after a short delay
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! A support agent will respond shortly. Is there anything else I can help with?",
          isUser: false,
        },
      ])
    }, 1000)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Email Sent",
      description: "We've received your message and will respond within 24 hours.",
    })
    setEmailDialogOpen(false)
    setEmailForm({ subject: "", message: "" })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmailForm((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Import ProfileSidebar component */}
        <div className="hidden lg:block">
          {/* @ts-expect-error Server Component */}
          <ProfileSidebar activePage="support" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Support & FAQs</h1>

          <Tabs defaultValue="faqs" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="faqs">Frequently Asked Questions</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
            </TabsList>

            <TabsContent value="faqs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ordering & Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I track my order?</AccordionTrigger>
                      <AccordionContent>
                        You can track your order by going to the "Your Orders" section in your profile. Click on "View
                        details" for the specific order you want to track. You'll see real-time updates on your order
                        status.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>What if I'm not home during delivery?</AccordionTrigger>
                      <AccordionContent>
                        If you won't be home during delivery, you can select "Contactless Delivery" in your preferences.
                        The driver will leave your order at your door. You can also add delivery instructions when
                        placing your order.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Can I change or cancel my order?</AccordionTrigger>
                      <AccordionContent>
                        You can modify or cancel your order within 30 minutes of placing it. Go to "Your Orders," find
                        the order you want to change, and click "View details." From there, you can make changes or
                        cancel if eligible.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>What is the delivery fee?</AccordionTrigger>
                      <AccordionContent>
                        Delivery fees vary based on your location and order size. Orders over $35 qualify for free
                        delivery. You can see the exact delivery fee during checkout before confirming your order.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Returns & Refunds</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is your return policy?</AccordionTrigger>
                      <AccordionContent>
                        If you're not satisfied with any product, you can request a refund within 24 hours of delivery.
                        For perishable items, please report any issues immediately upon delivery.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do I report missing or damaged items?</AccordionTrigger>
                      <AccordionContent>
                        To report missing or damaged items, go to "Your Orders," select the affected order, and click
                        "View details." Then select "Report an issue" and follow the instructions. Our support team will
                        review your request within 24 hours.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>When will I receive my refund?</AccordionTrigger>
                      <AccordionContent>
                        Refunds are typically processed within 3-5 business days. The time it takes for the refund to
                        appear in your account depends on your payment method and financial institution.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account & Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I update my payment information?</AccordionTrigger>
                      <AccordionContent>
                        To update your payment information, go to "Settings" in your profile, then select "Payment
                        Methods." From there, you can add, edit, or remove payment methods.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is my personal information secure?</AccordionTrigger>
                      <AccordionContent>
                        Yes, we take security seriously. All personal and payment information is encrypted and stored
                        securely. We never share your information with third parties without your consent.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How do I change my email or password?</AccordionTrigger>
                      <AccordionContent>
                        To change your email or password, go to "Settings" in your profile, then select "Account
                        Information." You can update your email, password, and other account details there.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>We're here to help! Choose your preferred contact method.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="flex flex-col items-center p-4 text-center">
                      <MessageCircle className="h-8 w-8 text-green-600 mb-2" />
                      <h3 className="font-medium">Live Chat</h3>
                      <p className="text-sm text-gray-500 mb-4">Available 24/7</p>
                      <Button variant="outline" className="w-full" onClick={() => setLiveChatOpen(true)}>
                        Start Chat
                      </Button>
                    </Card>
                    <Card className="flex flex-col items-center p-4 text-center">
                      <Phone className="h-8 w-8 text-green-600 mb-2" />
                      <h3 className="font-medium">Phone Support</h3>
                      <p className="text-sm text-gray-500 mb-4">8am - 10pm Daily</p>
                      <Button variant="outline" className="w-full" onClick={() => setPhoneDialogOpen(true)}>
                        Call Us
                      </Button>
                    </Card>
                    <Card className="flex flex-col items-center p-4 text-center">
                      <Mail className="h-8 w-8 text-green-600 mb-2" />
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-gray-500 mb-4">Response within 24hrs</p>
                      <Button variant="outline" className="w-full" onClick={() => setEmailDialogOpen(true)}>
                        Email Us
                      </Button>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Send us a message</h3>
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault()
                        toast({
                          title: "Message Sent",
                          description: "We've received your message and will respond within 24 hours.",
                        })
                        // Reset form fields
                        e.currentTarget.reset()
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="email" type="email" placeholder="Your email" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" placeholder="What is this regarding?" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea id="message" placeholder="How can we help you?" rows={5} />
                      </div>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700">
                        Submit
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Live Chat Dialog */}
      <Dialog open={liveChatOpen} onOpenChange={setLiveChatOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Live Chat Support</DialogTitle>
            <DialogDescription>Chat with our support team in real-time.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col h-[300px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 border rounded-md mb-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isUser ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Phone Dialog */}
      <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Phone Support</DialogTitle>
            <DialogDescription>Call our customer support team.</DialogDescription>
          </DialogHeader>
          <div className="py-6 text-center">
            <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-xl font-bold mb-2">1-800-SWIFT-HELP</p>
            <p className="text-gray-500 mb-4">Available 8am - 10pm Daily</p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  // In a real app, this would use the tel: protocol
                  window.location.href = "tel:18007943843"
                }}
              >
                Call Now
              </Button>
              <Button onClick={() => setPhoneDialogOpen(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Support</DialogTitle>
            <DialogDescription>Send us an email and we'll respond within 24 hours.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email-subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="email-subject"
                name="subject"
                value={emailForm.subject}
                onChange={handleEmailChange}
                placeholder="What is this regarding?"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email-message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="email-message"
                name="message"
                value={emailForm.message}
                onChange={handleEmailChange}
                placeholder="How can we help you?"
                rows={5}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEmailDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Send Email
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
