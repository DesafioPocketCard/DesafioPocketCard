import React from "react";
import { IProfileTagProps } from "./types";

export default function ProfileTag({ title, count }: IProfileTagProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-bold border border-primary-200">
        {count}
      </div>
      <span className="text-sm font-semibold text-gray-700 text-center">
        {title}
      </span>
    </div>
  );
}
