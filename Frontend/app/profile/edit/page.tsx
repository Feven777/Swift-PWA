"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Camera } from "lucide-react"
import ProfileSidebar from "@/components/profile-sidebar";

export default function EditProfilePage() {
  const { user, updateProfile, isLoading } = useAuth()
  const { toast } = useToast()

  // Local form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setBio(user.bio ?? "")
      setAvatarUrl(user.avatarUrl)
    }
  }, [user])

  const handleSubmit = async () => {
    const { success, error } = await updateProfile({ name, email, bio, avatarUrl })
    if (success) {
      toast({ title: "Profile updated" })
    } else {
      toast({ title: "Update failed", description: error, variant: "destructive" })
    }
  }

  if (!user) return <div>Please sign in to edit your profile.</div>

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <div className="hidden lg:block">
          <ProfileSidebar activePage="settings" />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile image</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={avatarUrl ?? "/profile2.jpg"}
                    alt="avatar"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer">
                  <Camera className="h-4 w-4 text-white" />
                </div>
              </div>
              {/* You'd wire a file input here to upload and get a new URL */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your basic profile information</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Updating…" : "Update Profile"}
          </Button>
        </div>
      </div>
    </div>
  )
}
