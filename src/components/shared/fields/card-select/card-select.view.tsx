"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface Option {
  id: string | number;
  label: string;
}

interface Props {
  options: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
  title: string;
}

export function CardSelect({ options, value, onChange, title }: Props) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h3 className="text-base font-bold text-gray-700 leading-relaxed">{title}</h3>
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              className={cn(
                "flex items-center justify-between px-5 py-5 bg-white border-2 border-gray-200 rounded-2xl cursor-pointer transition-all text-left",
                "hover:border-primary-200 hover:bg-gray-50",
                isSelected && "border-primary-500 bg-primary-50"
              )}
              onClick={() => onChange(option.id)}
            >
              <span className={cn("text-[15px] font-semibold text-gray-600 flex-1", isSelected && "text-primary-700")}>
                {option.label}
              </span>
              <div className="w-6 h-6 text-primary-500 flex items-center justify-center shrink-0">
                {isSelected && <CheckCircle2 size={20} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
