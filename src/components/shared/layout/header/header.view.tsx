"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  User,
  X,
  LogOut,
  ChevronRight,
  Target,
  Gift,
  Package,
  FileText,
  LucideIcon,
  Menu,
} from "lucide-react";
import { useHeaderViewModel } from "./header.view-model";
import Logo from "@/components/shared/ui/logo/logo.component";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = ReturnType<typeof useHeaderViewModel>;

const iconMap: Record<string, LucideIcon> = {
  User,
  Bell,
  Target,
  Gift,
  Package,
  FileText,
};

export function HeaderView({
  user,
  isMenuOpen,
  toggleMenu,
  closeMenu,
  navigate,
  menuOptions,
  handleLogout,
}: Props) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/40 py-2 sm:py-3 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div onClick={() => navigate("/")} className="cursor-pointer active:scale-95 transition-transform flex items-center">
            <Logo
              logoType="horizontal-b"
              height={36}
              useDefaultSize={false}
              width={108}
              className="sm:h-10 sm:w-30"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/notifications")}
              className="rounded-full text-muted-foreground hover:text-primary transition-colors h-10 w-10 sm:h-11 sm:w-11"
            >
              <Bell size={22} className="size-6" />
            </Button>
            
            <button
              className="group relative p-0.5 rounded-full bg-linear-to-tr from-primary-400 via-primary-200 to-primary-600 transition-all hover:scale-110 active:scale-95 cursor-pointer"
              onClick={toggleMenu}
            >
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative rounded-full bg-white p-0.5">
                {user?.foto_perfil ? (
                  <div className="relative size-8 sm:size-9 rounded-full border border-border overflow-hidden">
                    <Image
                      src={user.foto_perfil}
                      alt="Perfil"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="size-8 sm:size-9 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
                    <User size={18} className="sm:size-20" />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 1 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-white z-[101] shadow-2xl flex flex-col glass border-l border-white/20"
            >
              <div className="p-6 pt-10 border-b border-border/50 flex justify-between items-start">
                <div className="flex flex-col gap-4">
                  <div className="size-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 shadow-inner overflow-hidden relative border border-primary-50">
                    {user?.foto_perfil ? (
                      <Image
                        src={user.foto_perfil}
                        alt="Perfil"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <User size={30} />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 tracking-tight">{user?.nome}</h4>
                    <p className="text-[13px] text-muted-foreground font-medium">{user?.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMenu}
                  className="rounded-full text-muted-foreground hover:bg-gray-100"
                >
                  <X size={20} />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <nav className="flex flex-col gap-1.5">
                  {menuOptions.map((option) => {
                    const Icon = iconMap[option.icon];
                    return (
                      <button
                        key={option.path}
                        onClick={() => navigate(option.path)}
                        className="flex items-center px-4 py-3 rounded-2xl text-gray-600 transition-all hover:bg-primary/5 hover:text-primary active:scale-[0.98] border-none bg-transparent w-full text-left cursor-pointer group"
                      >
                        <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center mr-4 transition-all group-hover:bg-white group-hover:shadow-md group-hover:text-primary border border-transparent group-hover:border-primary-100">
                          <Icon size={18} />
                        </div>
                        <span className="text-base font-bold flex-1 tracking-tight">{option.label}</span>
                        <ChevronRight size={16} className="text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-primary" />
                      </button>
                    );
                  })}
                </nav>

                <div className="h-px bg-border/40 mx-4 my-6" />

                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 rounded-2xl transition-all border-none w-full text-left cursor-pointer group text-destructive hover:bg-destructive/5 active:scale-[0.98] bg-transparent"
                >
                  <div className="size-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mr-4 transition-all group-hover:bg-white group-hover:shadow-md border border-transparent group-hover:border-destructive/20">
                    <LogOut size={18} />
                  </div>
                  <span className="text-base font-bold flex-1 tracking-tight">Sair da conta</span>
                </button>
              </div>
              
              <div className="p-6 border-t border-border/50 bg-gray-50/50">
                 <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black text-center">
                   PocketCard v1.0.0
                 </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
