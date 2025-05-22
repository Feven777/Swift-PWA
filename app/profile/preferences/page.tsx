import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ProfileSidebar from "@/components/profile-sidebar"

export default function PreferencesPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Import ProfileSidebar component */}
        <div className="hidden lg:block">
          <ProfileSidebar activePage="preferences" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Preferences</h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications from Swift</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="order-updates" className="font-medium">
                      Order Updates
                    </Label>
                    <p className="text-sm text-gray-500">Receive notifications about your order status</p>
                  </div>
                  <Switch id="order-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="promotions" className="font-medium">
                      Promotions and Deals
                    </Label>
                    <p className="text-sm text-gray-500">Get notified about special offers and discounts</p>
                  </div>
                  <Switch id="promotions" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="delivery-reminders" className="font-medium">
                      Delivery Reminders
                    </Label>
                    <p className="text-sm text-gray-500">Receive reminders before your delivery arrives</p>
                  </div>
                  <Switch id="delivery-reminders" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
                <CardDescription>Help us customize your shopping experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="vegetarian" />
                    <div>
                      <Label htmlFor="vegetarian" className="font-medium">
                        Vegetarian
                      </Label>
                      <p className="text-sm text-gray-500">Exclude meat products</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="vegan" />
                    <div>
                      <Label htmlFor="vegan" className="font-medium">
                        Vegan
                      </Label>
                      <p className="text-sm text-gray-500">Exclude all animal products</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="gluten-free" />
                    <div>
                      <Label htmlFor="gluten-free" className="font-medium">
                        Gluten Free
                      </Label>
                      <p className="text-sm text-gray-500">Exclude products with gluten</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="dairy-free" />
                    <div>
                      <Label htmlFor="dairy-free" className="font-medium">
                        Dairy Free
                      </Label>
                      <p className="text-sm text-gray-500">Exclude dairy products</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Preferences</CardTitle>
                <CardDescription>Set your preferred delivery options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="font-medium">Preferred Delivery Time</Label>
                  <RadioGroup defaultValue="morning" className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="morning" id="morning" />
                      <Label htmlFor="morning">Morning (8am - 12pm)</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="afternoon" id="afternoon" />
                      <Label htmlFor="afternoon">Afternoon (12pm - 5pm)</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="evening" id="evening" />
                      <Label htmlFor="evening">Evening (5pm - 9pm)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox id="contactless" defaultChecked />
                  <div>
                    <Label htmlFor="contactless" className="font-medium">
                      Contactless Delivery
                    </Label>
                    <p className="text-sm text-gray-500">Driver will leave your order at the door</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700">Save Preferences</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
