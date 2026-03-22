"use client";

import React from "react";
import { Bell, RefreshCw, Calendar, Inbox, ArrowLeft } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNotificationsViewModel } from "./notifications.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import { NotificationCard } from "@/components/shared/cards/notification-card/notification-card.view";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = ReturnType<typeof useNotificationsViewModel>;

export function NotificationsView({ notificationGroups, totalNotifications, isLoading, isError, refetch }: Props) {
  const router = useRouter();

  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-6 sm:gap-8 animate-in delay-100">
           <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()} 
              className="bg-white/10 hover:bg-white/20 text-white rounded-2xl size-12"
            >
              <ArrowLeft size={24} />
            </Button>
            <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/40">
               <Bell size={24} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black text-white tracking-tight sm:text-5xl">Notificações</h1>
            <p className="text-base text-white/70 font-medium max-w-[320px] leading-relaxed">
               {isLoading ? "Sincronizando seus alertas..." : `Você possui ${totalNotifications} novas mensagens.`}
            </p>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-8 min-h-[400px]">
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-6 animate-pulse">
            <RefreshCw className="animate-spin text-primary-200" size={64} strokeWidth={1} />
            <p className="text-xs font-black text-gray-400 tracking-widest uppercase">Carregando...</p>
          </div>
        )}
        
        {isError && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-6 text-center max-w-sm mx-auto">
            <div className="size-20 rounded-3xl bg-destructive/5 flex items-center justify-center text-destructive">
               <RefreshCw size={40} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase text-sm">Falha na conexão</h3>
              <p className="text-sm font-medium text-muted-foreground">Não foi possível recuperar seus alertas. Verifique sua rede.</p>
            </div>
            <Button 
              onClick={() => refetch()} 
              variant="outline"
              className="mt-4 font-black uppercase tracking-widest text-[10px]"
              leftIcon={<RefreshCw size={14} />}
            >
              Tentar novamente
            </Button>
          </div>
        )}
        
        {!isLoading && !isError && notificationGroups.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-6 text-center max-w-sm mx-auto">
            <div className="size-24 rounded-full bg-gray-50 flex items-center justify-center text-gray-200">
               <Inbox size={64} strokeWidth={1} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-black text-gray-900 tracking-tight lowercase first-letter:uppercase">Tudo limpo por aqui</h3>
              <p className="text-sm font-medium text-muted-foreground">Você não possui notificações pendentes no momento.</p>
            </div>
          </div>
        )}

        {!isLoading && !isError && notificationGroups.length > 0 && (
          <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {notificationGroups.map(({ date, items }, groupIdx) => (
              <div 
                key={date} 
                className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                style={{ animationDelay: `${groupIdx * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-4 px-1">
                  <div className="h-px flex-1 bg-border/40" />
                  <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] whitespace-nowrap">
                    <Calendar size={12} className="text-primary/40" />
                    <span>{format(parseISO(date), "dd 'de' MMMM", { locale: ptBR })}</span>
                  </div>
                  <div className="h-px flex-1 bg-border/40" />
                </div>
                
                <div className="grid gap-4">
                  {items.map((notification, index) => (
                    <NotificationCard
                      key={`${date}-${index}`}
                      message={notification.message}
                      coins={notification.received_credits}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RadialWrapper>
  );
}
