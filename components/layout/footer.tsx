import Link from "next/link"
import { Twitter, Instagram, Youtube, Facebook } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-8 pb-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Swift Delivery</h3>
            <p className="text-sm text-gray-600 mb-4">Making grocery delivery simple, fast, and transparent</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/supermarkets" className="text-gray-600 hover:text-gray-900">
                  Supermarkets
                </Link>
              </li>
              <li>
                <Link href="/categories/fresh" className="text-gray-600 hover:text-gray-900">
                  Fresh Produce
                </Link>
              </li>
              <li>
                <Link href="/categories/meals" className="text-gray-600 hover:text-gray-900">
                  Meal Kits
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-600 hover:text-gray-900">
                  Deals & Offers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/track" className="text-gray-600 hover:text-gray-900">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/delivery-info" className="text-gray-600 hover:text-gray-900">
                  Delivery Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-gray-900">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 hover:text-gray-900">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2023 Swift Delivery. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-gray-700">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
