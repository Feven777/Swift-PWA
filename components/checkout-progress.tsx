"use client"

import { useCheckout } from "@/context/checkout-context"

interface CheckoutProgressProps {
  currentStep: number
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const { setCurrentStep } = useCheckout()

  const steps = [
    { id: 1, name: "Delivery" },
    { id: 2, name: "Payment" },
    { id: 3, name: "Confirmation" },
  ]

  const handleStepClick = (stepId: number) => {
    // Only allow going back to previous steps, not skipping ahead
    if (stepId < currentStep) {
      setCurrentStep(stepId)
    }
  }

  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="relative flex items-center justify-center" onClick={() => handleStepClick(step.id)}>
              <div
                className={`h-5 w-5 md:h-8 md:w-8 rounded-full flex items-center justify-center ${
                  step.id === currentStep
                    ? "bg-green-500 text-white"
                    : step.id < currentStep
                      ? "bg-green-500 text-white cursor-pointer"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`ml-1 md:ml-2 text-xs md:text-sm font-medium ${
                  step.id === currentStep ? "text-green-500" : step.id < currentStep ? "cursor-pointer" : ""
                }`}
              >
                {step.name.substring(0, 1)}
                <span className="hidden md:inline">{step.name.substring(1)}</span>
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 mx-1 md:mx-4">
                <div className={`h-1 ${step.id < currentStep ? "bg-green-500" : "bg-gray-200"}`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
