import { Metadata } from "next"
import { FileText, Shield, User, Truck, CreditCard, AlertCircle, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service - Swift Delivery",
  description: "Read our terms of service to understand the rules and guidelines for using Swift Delivery.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-gray-100">
              Understanding the rules and guidelines for using Swift Delivery
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Welcome to Swift Delivery</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              By accessing or using Swift Delivery's services, you agree to be bound by these Terms of Service and all
              applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using
              or accessing this service.
            </p>
          </div>

          {/* Use License */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Use License</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Permission is granted to temporarily use Swift Delivery's services for personal, non-commercial purposes.
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-2 text-gray-700">
                <li>• Modify or copy the materials</li>
                <li>• Use the materials for any commercial purpose</li>
                <li>• Attempt to decompile or reverse engineer any software</li>
                <li>• Remove any copyright or other proprietary notations</li>
                <li>• Transfer the materials to another person</li>
              </ul>
            </div>
          </div>

          {/* User Account */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <User className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">User Account</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              To use certain features of the service, you must register for an account. You agree to:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-2 text-gray-700">
                <li>• Provide accurate and complete information</li>
                <li>• Keep your account information updated</li>
                <li>• Maintain the security of your account</li>
                <li>• Notify us of any unauthorized access</li>
              </ul>
            </div>
          </div>

          {/* Ordering and Delivery */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <Truck className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Ordering and Delivery</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Order Requirements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Provide accurate delivery information</li>
                  <li>• Ensure someone is available to receive</li>
                  <li>• Verify order details before confirmation</li>
                  <li>• Follow delivery instructions</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Delivery Terms</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Delivery times are estimates</li>
                  <li>• We may refuse service</li>
                  <li>• Additional fees may apply</li>
                  <li>• Weather conditions may affect delivery</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <CreditCard className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Payment Terms</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Payment Methods</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Credit/Debit Cards</li>
                  <li>• Mobile Payments</li>
                  <li>• Cash on Delivery</li>
                  <li>• Bank Transfers</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Payment Terms</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Full payment at time of order</li>
                  <li>• Prices subject to change</li>
                  <li>• Additional fees may apply</li>
                  <li>• Refunds as per policy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cancellation and Refunds */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <AlertCircle className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Cancellation and Refunds</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Orders may be cancelled before they are processed by the supermarket. Refunds are processed according to our
              refund policy and may take 5-7 business days to appear in your account.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Refund Policy</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Full refund for unprocessed orders</li>
                <li>• Partial refund for processed orders</li>
                <li>• No refund for delivered orders</li>
                <li>• Processing time: 5-7 business days</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Mail className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@swiftdelivery.com" className="text-primary hover:underline font-medium">
                legal@swiftdelivery.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 