import { Metadata } from "next"
import { Truck, Clock, Shield, Users, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Swift Delivery",
  description: "Learn more about Swift Delivery and our mission to make grocery delivery simple, fast, and transparent.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Swift Delivery</h1>
            <p className="text-xl text-gray-100">
              Ethiopia's leading grocery delivery service, making your shopping experience
              simple, fast, and transparent.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to revolutionize grocery shopping in Ethiopia by providing a convenient, reliable, and
              efficient delivery service that saves time and enhances the shopping experience for our customers.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Fast Delivery</h3>
              </div>
              <p className="text-gray-700">
                We ensure quick and reliable delivery of your groceries, right to your doorstep.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Time-Saving</h3>
              </div>
              <p className="text-gray-700">
                Save valuable time by shopping online and having your groceries delivered.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Quality Assured</h3>
              </div>
              <p className="text-gray-700">
                We carefully select our partner supermarkets to ensure the highest quality products.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">Customer Focus</h3>
              </div>
              <p className="text-gray-700">
                Your satisfaction is our priority, with dedicated support for all your needs.
              </p>
            </div>
          </div>

          {/* Impact Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-gray-700">Partner Supermarkets</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                <p className="text-gray-700">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                <p className="text-gray-700">Deliveries Completed</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Have questions or feedback? We'd love to hear from you. Visit our{" "}
              <a href="/support" className="text-primary hover:underline font-medium">
                Support page
              </a>{" "}
              to get in touch with our team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 