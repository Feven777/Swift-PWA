"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, Calendar } from "lucide-react"
import { useCheckout } from "@/context/checkout-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DeliveryTimePicker() {
  const { estimatedDelivery, setEstimatedDelivery } = useCheckout()
  const [activeTab, setActiveTab] = useState("today")

  // Generate delivery time slots for today
  const today = new Date()
  const todayDate = today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })

  // Generate delivery time slots for tomorrow
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowDate = tomorrow.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })

  // Current hour
  const currentHour = today.getHours()

  // Generate time slots
  const generateTimeSlots = (date: Date, isToday: boolean) => {
    const slots = []
    const startHour = isToday ? Math.max(currentHour + 2, 10) : 10 // Start 2 hours from now or 10 AM
    const endHour = 21 // End at 9 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      if (hour % 2 === 0) {
        // Every 2 hours
        const startTime = `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`
        const endTime = `${(hour + 1) % 12 || 12}:30 ${(hour + 1) < 12 ? "AM" : "PM"}`
        const timeSlot = `${startTime} - ${endTime}`
        const fullTimeSlot = `${isToday ? "Today" : "Tomorrow"}, ${timeSlot}`

        slots.push({
          id: `${isToday ? "today" : "tomorrow"}-${hour}`,
          time: timeSlot,
          fullTime: fullTimeSlot,
        })
      }
    }

    return slots
  }

  const todaySlots = generateTimeSlots(today, true)
  const tomorrowSlots = generateTimeSlots(tomorrow, false)

  return (
    <div className="border rounded-lg p-4 bg-white">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="today" className="flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </TabsTrigger>
          <TabsTrigger value="tomorrow" className="flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2" />
            Tomorrow
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <p className="text-sm text-gray-500 mb-2">Select a delivery time for {todayDate}</p>

          <RadioGroup
            value={estimatedDelivery}
            onValueChange={setEstimatedDelivery}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {todaySlots.length > 0 ? (
              todaySlots.map((slot) => (
                <div key={slot.id} className="flex items-start">
                  <RadioGroupItem value={slot.fullTime} id={slot.id} className="mt-1" />
                  <div className="ml-3">
                    <Label htmlFor={slot.id} className="font-medium text-sm">
                      {slot.time}
                    </Label>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Estimated arrival time
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-4 text-gray-500">
                No more delivery slots available for today. Please check tomorrow.
              </div>
            )}
          </RadioGroup>
        </TabsContent>

        <TabsContent value="tomorrow" className="space-y-4">
          <p className="text-sm text-gray-500 mb-2">Select a delivery time for {tomorrowDate}</p>

          <RadioGroup
            value={estimatedDelivery}
            onValueChange={setEstimatedDelivery}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {tomorrowSlots.map((slot) => (
              <div key={slot.id} className="flex items-start">
                <RadioGroupItem value={slot.fullTime} id={slot.id} className="mt-1" />
                <div className="ml-3">
                  <Label htmlFor={slot.id} className="font-medium text-sm">
                    {slot.time}
                  </Label>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    Estimated arrival time
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </TabsContent>
      </Tabs>
    </div>
  )
}
