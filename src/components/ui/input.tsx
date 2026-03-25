"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Input({
  className,
  type,
  error,
  leftIcon,
  rightIcon,
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const { value, ...restProps } = props
  const valueProps = Object.prototype.hasOwnProperty.call(props, "value")
    ? { value: value ?? "" }
    : {}

  return (
    <div className="relative group w-full">
      {leftIcon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-2 text-base ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          leftIcon && "pl-11",
          rightIcon && "pr-11",
          error && "border-destructive focus-visible:ring-destructive",
          !error && "hover:border-primary-200 focus:border-primary",
          className
        )}
        ref={ref}
        {...valueProps}
        {...restProps}
      />
      {rightIcon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          {rightIcon}
        </div>
      )}
    </div>
  )
}
