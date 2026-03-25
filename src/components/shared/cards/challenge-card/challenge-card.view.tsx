"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Trophy, ChevronRight, Star } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  expiration: string;
  points: number;
  photo: string;
  onClick: () => void;
}

export function ChallengeCard({ title, expiration, points, photo, onClick }: Props) {
  const formattedDate = React.useMemo(() => {
    try {
      return format(parseISO(expiration), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return expiration;
    }
  }, [expiration]);

  return (
    <button
      onClick={onClick}
      className="w-full transition-all group active:scale-[0.98] outline-none"
    >
      <Card className="relative flex items-center gap-4 p-4 border-border/50 bg-white group-hover:border-primary/20 group-hover:shadow-xl transition-all rounded-xl overflow-hidden">
        <div className="absolute top-0 right-0 p-1.5 bg-primary/10 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity">
           <Star size={12} className="text-primary animate-pulse" fill="currentColor" />
        </div>
        
        <div className="relative size-16 sm:size-20 rounded-xl overflow-hidden bg-linear-to-br from-primary-50 to-primary-100/50 shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2 border border-primary-100/50">
          {photo ? (
            <Image src={photo} alt={title} fill className="object-cover" unoptimized />
          ) : (
            <div className="flex items-center justify-center h-full text-primary-300">
               <Star size={32} />
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col items-start gap-1.5 min-w-0">
          <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight tracking-tight truncate w-full group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest">
              <Calendar size={14} className="text-primary-400" />
              <span>Expira em {formattedDate}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs font-black text-success-600 bg-success-50 px-2 py-0.5 rounded-lg border border-success-100 shadow-xs group-hover:shadow-success-200/50 group-hover:scale-105 transition-all">
              <Trophy size={12} className="text-amber-500" />
              <span>{points} PTS</span>
            </div>
          </div>
        </div>
        
        <div className="size-8 rounded-lg flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:shadow-[0_0_10px_rgba(97,67,179,0.3)]">
          <ChevronRight size={18} strokeWidth={3} />
        </div>
      </Card>
    </button>
  );
}
