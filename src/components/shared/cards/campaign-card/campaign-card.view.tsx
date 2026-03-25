"use client";

import React from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Award, ChevronRight } from "lucide-react";
import { CampaignCardProps } from "./campaign-card.model";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CampaignCardView({
  title,
  expiration,
  points,
  photo,
  onClick,
  isRegulation = false,
}: CampaignCardProps) {
  const formattedDate = React.useMemo(() => {
    try {
      return format(parseISO(expiration), "dd 'de' MMMM", { locale: ptBR });
    } catch {
      return expiration;
    }
  }, [expiration]);

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary/10 active:scale-[0.99] border-border/50">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 items-stretch sm:items-center">
        {/* Photo Container */}
        <div className="relative shrink-0 w-full sm:w-28 h-32 sm:h-28 rounded-2xl overflow-hidden shadow-sm bg-gray-50 border border-border/40 group-hover:shadow-md transition-shadow">
          <Image
            src={photo}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent sm:hidden" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-xl font-black text-gray-900 leading-tight tracking-tight truncate group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="hidden sm:flex size-8 rounded-full bg-gray-50 items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
               <ChevronRight size={16} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 sm:gap-2 mb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground bg-gray-50 sm:bg-transparent p-2 rounded-lg sm:p-0">
              <Calendar size={14} className="text-primary/60 shrink-0" />
              <span className="truncate">Até <span className="font-bold text-gray-700">{formattedDate}</span></span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground bg-gray-50 sm:bg-transparent p-2 rounded-lg sm:p-0">
              <Award size={14} className="text-primary/60 shrink-0" />
              <span className="truncate">Vale <span className="font-bold text-primary-600">{points} pts</span></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-auto">
             <Button
                onClick={onClick}
                variant={isRegulation ? "outline" : "default"}
                size="sm"
                className="w-full sm:w-fit font-black uppercase text-[10px] tracking-widest sm:h-9"
             >
                {isRegulation ? "Regulamento" : "Ver Metas"}
             </Button>
          </div>
        </div>
      </div>
      
      {/* Small accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
    </Card>
  );
}
