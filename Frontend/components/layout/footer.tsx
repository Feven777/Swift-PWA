import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-8 pb-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/supermarkets" className="text-gray-600 hover:text-gray-900">
                  Supermarkets
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-600 hover:text-gray-900">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tracking" className="text-gray-600 hover:text-gray-900">
                  Track Order
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

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 ">
          <p>© 2023 Swift Delivery. All rights reserved.</p>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mt-4 md:mt-0 ">
            <div className="flex space-x-2 mb-2 md:mb-0 md:order-2 ml-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group focus:outline-none">
                <span className="sr-only">Twitter</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-200 group-hover:bg-blue-100 group-hover:shadow-md transition-all">
                  <svg className="h-4 w-4 text-blue-500 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.46 5.924c-.793.352-1.646.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.48 0-4.49 2.01-4.49 4.49 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.6 1.67 4.905c-.386.664-.607 1.437-.607 2.26 0 1.56.794 2.936 2.003 3.744a4.48 4.48 0 0 1-2.034-.563v.057c0 2.18 1.55 4.002 3.604 4.417-.377.103-.775.158-1.186.158-.29 0-.57-.028-.844-.08.57 1.78 2.23 3.08 4.2 3.12A8.98 8.98 0 0 1 2 19.54a12.68 12.68 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.18 9.18 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z"/></svg>
                </span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group focus:outline-none">
                <span className="sr-only">Facebook</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-200 group-hover:bg-blue-200 group-hover:shadow-md transition-all">
                  <svg className="h-4 w-4 text-blue-700 group-hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                </span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group focus:outline-none">
                <span className="sr-only">Instagram</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-200 group-hover:bg-pink-100 group-hover:shadow-md transition-all">
                  <svg className="h-4 w-4 text-pink-500 group-hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37c-.967.967-1.24 2.14-1.298 3.417C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.058 1.277.331 2.45 1.298 3.417.967.967 2.14 1.24 3.417 1.298C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.058 2.45-.331 3.417-1.298.967-.967 1.24-2.14 1.298-3.417.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.058-1.277-.331-2.45-1.298-3.417-.967-.967-2.14-1.24-3.417-1.298C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
                </span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="group focus:outline-none">
                <span className="sr-only">YouTube</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-200 group-hover:bg-red-100 group-hover:shadow-md transition-all">
                  <svg className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.12C19.163 3.5 12 3.5 12 3.5s-7.163 0-9.391.566A2.994 2.994 0 0 0 .502 6.186C0 8.414 0 12 0 12s0 3.586.502 5.814a2.994 2.994 0 0 0 2.107 2.12C4.837 20.5 12 20.5 12 20.5s7.163 0 9.391-.566a2.994 2.994 0 0 0 2.107-2.12C24 15.586 24 12 24 12s0-3.586-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </span>
              </a>
            </div>
            <div className="flex space-x-4 md:order-1">
              <Link href="/privacy" className="hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
