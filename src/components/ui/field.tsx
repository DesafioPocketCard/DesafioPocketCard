"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export function FieldGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />
}

export function Field({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-2 relative", className)} {...props} />
}

export function FieldLabel({
  className,
  ref,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { ref?: React.Ref<HTMLLabelElement> }) {
  return (
    <Label 
      ref={ref} 
      className={cn("text-gray-700 font-bold tracking-tight mb-0.5", className)} 
      {...props} 
    />
  )
}

export function FieldDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-muted-foreground font-medium", className)} {...props} />
}

export function FieldError({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p 
      className={cn("text-xs font-bold text-destructive animate-in fade-in slide-in-from-top-1", className)} 
      {...props}
    >
      {children}
    </p>
  )
}

export function FieldSeparator({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "relative flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/60 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border", 
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}
