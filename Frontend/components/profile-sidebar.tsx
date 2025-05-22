"use client"

import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"
import Link from "next/link"
import { FileText, Home, MessageSquare, Settings, LogOut, Edit } from "lucide-react"

interface ProfileSidebarProps {
  activePage?: "orders" | "preferences" | "support" | "settings"
}

export default function ProfileSidebar({
  activePage = "orders",
}: ProfileSidebarProps) {
  const { user, isLoading, logout } = useAuth()

  // 1) Show spinner while context hydrates
  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <LogOut className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    )
  }

  // 2) If not logged in, prompt to authenticate
  if (!user) {
    return (
      <div className="p-4 text-center text-red-500">
        You’re not signed in.{" "}
        <Link href="/auth" className="text-green-600 hover:underline">
          Go to login
        </Link>
      </div>
    )
  }

  // 3) Real sidebar
  return (
    <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
      {/* Profile Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-3">
          <Image
            src={ user.avatarUrl ?? "/profile2.jpg"}
            alt={`${user.name}’s avatar`}
            width={100}
            height={100}
            className="rounded-full object-cover border-4 border-red-200 bg-red-200"
          />
        </div>
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <Link
          href="/profile/edit"
          className="flex items-center text-green-600 mt-2 text-sm"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit Profile
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="w-full">
        <ul className="space-y-2 w-full">
          <li>
            <Link
              href="/profile"
              className={`flex items-center p-3 rounded-md w-full ${
                activePage === "orders"
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FileText className="h-5 w-5 mr-3" />
              Your Orders
            </Link>
          </li>
          <li>
            <Link
              href="/profile/preferences"
              className={`flex items-center p-3 rounded-md w-full ${
                activePage === "preferences"
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home className="h-5 w-5 mr-3" />
              Your Preferences
            </Link>
          </li>
          <li>
            <Link
              href="/support"
              className={`flex items-center p-3 rounded-md w-full ${
                activePage === "support"
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              Support & FAQs
            </Link>
          </li>
          <li>
            <Link
              href="/profile/setting"
              className={`flex items-center p-3 rounded-md w-full ${
                activePage === "settings"
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-6 w-full">
        <button
          onClick={logout}
          className="flex items-center p-3 text-red-600 hover:bg-gray-100 rounded-md w-full"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}
