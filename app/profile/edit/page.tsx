import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Camera } from "lucide-react";
import ProfileSidebar from "@/components/profile-sidebar";

export default function EditProfilePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Import ProfileSidebar component */}
        <div className="hidden lg:block">
          <ProfileSidebar />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Profile
          </h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile image</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-red-200">
                      <Image
                        src="/profile.jpg?height=128&width=128"
                        alt="Profile Picture"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-green-600 rounded-full p-2 cursor-pointer">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="font-medium mb-1">Upload a new photo</h3>
                      <p className="text-sm text-gray-500 mb-3">
                        Your photo should be in JPG or PNG format
                      </p>
                      <div className="flex items-center gap-4">
                        <Button variant="outline">Choose File</Button>
                        <Button variant="ghost" className="text-red-600">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update your basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input type="text" id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input type="text" id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Write a short bio about yourself"
                    className="mt-1"
                    defaultValue="A short bio about me."
                  />
                </div>
              </CardContent>
            </Card>

            <Button>Update Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
