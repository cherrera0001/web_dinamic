"use client"

import * as React from "react"

interface SliderProps {
  min?: number
  max?: number
  step?: number
  defaultValue?: number[]
  className?: string
  onValueChange?: (value: number[]) => void
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = [50],
  className = "",
  onValueChange,
}: SliderProps) {
  const [value, setValue] = React.useState(defaultValue[0])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value, 10)
    setValue(newValue)
    if (onValueChange) {
      onValueChange([newValue])
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  )
}
