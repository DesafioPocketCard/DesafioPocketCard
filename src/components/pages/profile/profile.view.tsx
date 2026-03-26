"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, Camera, User, Edit3, RefreshCw, Mail, Phone, Briefcase, Star, Trophy, Flame } from "lucide-react";
import { useProfileViewModel } from "./profile.view-model";

type Props = ReturnType<typeof useProfileViewModel>;

export function ProfileView({
  profile,
  isLoading,
  handleUploadPicture,
  isUploading,
  goBack,
  goToEdit,
}: Props) {
  if (isLoading && !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-background">
        <RefreshCw className="animate-spin text-primary" size={40} />
        <p className="text-muted-foreground font-medium">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      {/* Hero Header — full bleed photo */}
      <div className="relative w-full" style={{ aspectRatio: "4/3", maxHeight: "55vh" }}>
        {/* Background photo */}
        {profile?.nome_arquivo ? (
          <Image
            src={profile.nome_arquivo}
            alt="Foto de perfil"
            fill
            className="object-cover"
            unoptimized
            priority
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary-900 via-primary-600 to-primary-300 flex items-center justify-center">
            <User size={96} className="text-white/40" />
          </div>
        )}

        {/* Gradient overlay (bottom fade) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />

        {/* Top FABs */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
          <button
            onClick={goBack}
            className="w-11 h-11 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-transform active:scale-90 hover:bg-black/50"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleUploadPicture}
              disabled={isUploading}
              className="w-11 h-11 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-transform active:scale-90 hover:bg-black/50 disabled:opacity-50"
            >
              {isUploading ? <RefreshCw size={18} className="animate-spin" /> : <Camera size={18} />}
            </button>

            <button
              onClick={goToEdit}
              className="h-11 px-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/30 text-gray-900 font-bold text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-90 hover:bg-white"
            >
              <Edit3 size={16} />
              Editar
            </button>
          </div>
        </div>

        {/* Bottom name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h1 className="text-2xl font-black text-white leading-tight drop-shadow-sm">
            {profile?.nome_participante || "—"}
          </h1>
          {profile?.cargo_participante && (
            <p className="text-sm text-white/80 font-medium mt-0.5">
              {profile.cargo_participante}
            </p>
          )}
        </div>
      </div>

      {/* Content card — slides up over the photo */}
      <div className="flex-1 bg-background -mt-4 rounded-t-3xl shadow-2xl z-20 relative">
        <div className="flex flex-col gap-6 p-5 pt-6">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Metas Atingidas", value: profile?.metas_atingidas ?? 0, icon: <Trophy size={18} className="text-amber-500" /> },
              { label: "Desafios", value: profile?.desafios_concluidos ?? 0, icon: <Star size={18} className="text-violet-500" /> },
              { label: "Dias Ativos", value: profile?.dias_ativos ?? 0, icon: <Flame size={18} className="text-rose-500" /> },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-3 flex flex-col items-center gap-1.5 shadow-sm"
              >
                {stat.icon}
                <span className="text-2xl font-black text-foreground leading-none">{stat.value}</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground text-center tracking-tight leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Dados pessoais — modo visualização (sem inputs) */}
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-bold text-foreground">Dados Pessoais</h2>
            </div>

            <div className="divide-y divide-border">
              <ProfileRow
                icon={<User size={16} className="text-primary" />}
                label="Nome"
                value={profile?.nome_participante}
              />
              <ProfileRow
                icon={<Mail size={16} className="text-primary" />}
                label="E-mail"
                value={profile?.email_participante}
              />
              <ProfileRow
                icon={<Phone size={16} className="text-primary" />}
                label="Telefone"
                value={profile?.telefone_participante}
              />
              <ProfileRow
                icon={<Briefcase size={16} className="text-primary" />}
                label="Cargo"
                value={profile?.cargo_participante}
              />
            </div>
          </div>

          {/* Bio */}
          {profile?.bio_participante && (
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Sobre mim</p>
              <p className="text-sm text-foreground leading-relaxed">{profile.bio_participante}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{label}</span>
        <span className="text-sm font-semibold text-foreground truncate">
          {value || <span className="text-muted-foreground font-normal">Não informado</span>}
        </span>
      </div>
    </div>
  );
}
