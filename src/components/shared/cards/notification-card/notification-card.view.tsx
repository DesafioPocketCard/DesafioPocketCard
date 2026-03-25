"use client";

import React from "react";
import { Bell, Coins, Sparkle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  message: string;
  coins?: number;
}

export function NotificationCard({ message, coins }: Props) {
  const isReward = coins !== undefined && coins > 0;

  return (
    <Card className={cn(
      "relative border-border/50 bg-white transition-all hover:border-primary/20 hover:shadow-xl active:scale-[0.99] group overflow-hidden rounded-xl",
      isReward && "border-success-200/50 shadow-success-100/20"
    )}>
      <div className="flex gap-4 p-4 sm:p-5 relative z-10">
        <div className={cn(
          "size-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm",
          isReward ? "bg-linear-to-br from-success-50 to-success-100 text-success-600 border border-success-200" : "bg-primary-50 text-primary border border-primary-100"
        )}>
          {isReward ? <Sparkle size={22} className="animate-pulse" fill="currentColor" /> : <Bell size={20} />}
        </div>
        
        <div className="flex flex-col gap-2 min-w-0 justify-center">
          <p className="text-sm font-bold text-gray-800 leading-tight sm:leading-snug tracking-tight">
            {message}
          </p>
          {isReward && (
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-success-700 bg-success-100/50 w-fit px-2 py-1 rounded-lg border border-success-200 animate-in slide-in-from-left-2 duration-500">
              <Coins size={12} className="text-amber-500 animate-bounce" />
              <span>+{coins} Pontos Adicionados</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Gamified backgrounds */}
      {isReward && (
        <div className="absolute top-0 right-0 size-24 bg-success-400/5 rounded-full blur-2xl -mr-12 -mt-12 transition-all group-hover:bg-success-400/10 group-hover:scale-150 duration-700" />
      )}
      
      {/* Shimmer for all cards */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      
      {/* Decorative indicator */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1.5 opacity-0 group-hover:opacity-100 transition-opacity",
        isReward ? "bg-success-400" : "bg-primary"
      )} />
    </Card>
  );
}
