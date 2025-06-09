import { Metadata } from "next"
import { Shield, Lock, User, Mail, FileText, Bell } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy - Swift Delivery",
  description: "Learn about how Swift Delivery protects your privacy and handles your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-100">
              Your privacy is our priority. Learn how we protect and manage your personal information.
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
              <h2 className="text-3xl font-bold text-gray-900">Our Commitment to Privacy</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Swift Delivery, we take your privacy seriously. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our service.
            </p>
          </div>

          {/* Information Collection */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <User className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Personal Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Name and contact details</li>
                  <li>• Delivery address</li>
                  <li>• Payment information</li>
                  <li>• Account preferences</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Usage Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Order history</li>
                  <li>• Shopping preferences</li>
                  <li>• Device information</li>
                  <li>• Location data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Primary Uses</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Process and deliver your orders</li>
                  <li>• Communicate about your orders</li>
                  <li>• Provide customer support</li>
                  <li>• Send order updates</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Additional Uses</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Improve our services</li>
                  <li>• Send marketing communications</li>
                  <li>• Prevent fraud</li>
                  <li>• Analyze usage patterns</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <Lock className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Data Protection</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Security Measures</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Encryption of sensitive data</li>
                <li>• Regular security assessments</li>
                <li>• Access controls and authentication</li>
                <li>• Secure data storage</li>
              </ul>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <Bell className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Your Rights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Access and Control</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate data</li>
                  <li>• Request data deletion</li>
                  <li>• Object to processing</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Communication</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Opt-out of marketing</li>
                  <li>• Update preferences</li>
                  <li>• Withdraw consent</li>
                  <li>• Request information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Mail className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us at{" "}
              <a href="mailto:privacy@swiftdelivery.com" className="text-primary hover:underline font-medium">
                privacy@swiftdelivery.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 