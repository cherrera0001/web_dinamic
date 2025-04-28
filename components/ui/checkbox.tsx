"use client"

import type * as React from "react"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
}

export function Checkbox({ id, className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      id={id}
      className={`h-4 w-4 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    />
  )
}
