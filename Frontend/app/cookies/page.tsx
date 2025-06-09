import { Metadata } from "next"
import { Shield, Settings, Lock, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy - Swift Delivery",
  description: "Learn about how Swift Delivery uses cookies to enhance your shopping experience.",
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-xl text-gray-100">
              Understanding how we use cookies to improve your shopping experience
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
              <Shield className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">What are cookies?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website.
              They help us provide you with a better shopping experience by remembering your preferences and
              understanding how you use our service.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Lock className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Essential Cookies</h3>
              </div>
              <p className="text-gray-700">
                These cookies are necessary for the website to function properly. They enable basic functions like
                page navigation and access to secure areas of the website.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Settings className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Functionality Cookies</h3>
              </div>
              <p className="text-gray-700">
                These cookies enable the website to provide enhanced functionality and personalization based on your
                preferences and previous interactions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Analytics Cookies</h3>
              </div>
              <p className="text-gray-700">
                These cookies help us understand how visitors interact with our website by collecting and reporting
                information anonymously.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Settings className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Marketing Cookies</h3>
              </div>
              <p className="text-gray-700">
                These cookies are used to track visitors across websites to display relevant advertisements and
                promotional content.
              </p>
            </div>
          </div>

          {/* Cookie Control */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Managing Your Cookies</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
                computer and you can set most browsers to prevent them from being placed.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">How to manage cookies in your browser:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                  <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
                  <li>Safari: Preferences → Privacy → Cookies and website data</li>
                  <li>Edge: Settings → Cookies and site permissions → Cookies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Updates */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Policy Updates</h2>
            <p className="text-lg text-gray-700 mb-6">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other
              operational, legal, or regulatory reasons. Please check back periodically for any updates.
            </p>
            <p className="text-lg text-gray-700">
              If you have any questions about our use of cookies, please contact us at{" "}
              <a href="mailto:support@swiftdelivery.com" className="text-primary hover:underline font-medium">
                support@swiftdelivery.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 