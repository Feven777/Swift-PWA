"use client";

import { useState } from "react";
import { useCheckout } from "@/context/checkout-context";
import { cn } from "@/lib/utils";

export default function PickupTimePicker() {
  const { pickupTime, setPickupTime } = useCheckout();
  const [selectedDate, setSelectedDate] = useState("tomorrow");

  // Get dates for the next 5 days
  const getDates = () => {
    const dates = [];
    const today = new Date();

    // Tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    dates.push({
      id: "tomorrow",
      label: "Tomorrow",
      dayName: "Tomorrow",
      date: tomorrow,
      dateStr: tomorrow.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    });

    // Next 4 days
    for (let i = 2; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      dates.push({
        id: `day-${i}`,
        label: dayName,
        dayName: dayName,
        date: date,
        dateStr: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      });
    }

    return dates;
  };

  const dates = getDates();

  // Generate time slots for the selected date
  const timeSlots = [
    { id: "9am-10am", time: "9am–10am" },
    { id: "10am-11am", time: "10am–11am" },
    { id: "11am-noon", time: "11am–Noon" },
    { id: "noon-1pm", time: "Noon–1pm" },
    { id: "1pm-2pm", time: "1pm–2pm" },
    { id: "2pm-3pm", time: "2pm–3pm" },
    { id: "3pm-4pm", time: "3pm–4pm" },
    { id: "4pm-5pm", time: "4pm–5pm" },
  ];

  const handleSelectDate = (dateId: string) => {
    setSelectedDate(dateId);
    setPickupTime(""); // Reset time selection when date changes
  };

  const handleSelectTimeSlot = (timeSlot: string) => {
    const selectedDateObj = dates.find((d) => d.id === selectedDate);
    const formattedDate = selectedDateObj
      ? selectedDateObj.dayName
      : "Tomorrow";
    setPickupTime(`${formattedDate}, ${timeSlot}`);
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-6">When</h2>

      {/* Date selection */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        {dates.map((date) => (
          <button
            key={date.id}
            onClick={() => handleSelectDate(date.id)}
            className={cn(
              "min-w-[120px] py-3 px-4 rounded-lg border text-center flex-shrink-0 transition-all",
              selectedDate === date.id
                ? "border-gray-800 border-2"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="font-medium">{date.label}</div>
            <div className="text-sm text-gray-500">{date.dateStr}</div>
          </button>
        ))}
      </div>

      {/* Time slots */}
      <div className="space-y-4">
        {timeSlots.map((slot) => {
          const isSelected = pickupTime.includes(slot.time);

          return (
            <div key={slot.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center mr-3",
                    isSelected
                      ? "border-green-600 bg-green-600"
                      : "border-gray-300"
                  )}
                  onClick={() => handleSelectTimeSlot(slot.time)}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-base">{slot.time}</span>
              </div>
              <span className="font-medium text-green-800">FREE</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
