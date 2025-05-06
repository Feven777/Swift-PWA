"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ToggleSwitchProps {
  value: boolean
  onChange: (value: boolean) => void
  label: string
  description?: string
}

export function ToggleSwitch({ value, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center space-x-4">
      <Switch id={`switch-${label}`} checked={value} onCheckedChange={onChange} />
      <div className="grid gap-0.5">
        <Label htmlFor={`switch-${label}`} className="font-medium">
          {label}
        </Label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  )
}
