"use client";

import React from "react";
import { ArrowLeft, Save, RefreshCw, UserCircle } from "lucide-react";
import { useProfileEditViewModel } from "./profile-edit.view-model";
import Button from "@/components/shared/buttons/button/button.component";
import TextField from "@/components/shared/fields/text-field/text-field.component";
import TextareaFieldComponent from "@/components/shared/fields/textarea-field/textarea-field.component";

type Props = ReturnType<typeof useProfileEditViewModel>;

export function ProfileEditView({
  profile,
  isLoading,
  control,
  onSubmit,
  isSaving,
  goBack,
}: Props) {
  if (isLoading && !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-background">
        <RefreshCw className="animate-spin text-primary" size={40} />
        <p className="text-muted-foreground font-medium">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      {/* Header */}
      <div className="bg-linear-to-br from-primary-900 via-primary-600 to-primary-400 px-4 pt-4 pb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur border border-white/20 text-white flex items-center justify-center shadow transition-transform active:scale-90"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-white">Editar Perfil</h1>
            <p className="text-xs text-white/70">Atualize seus dados pessoais</p>
          </div>
        </div>
      </div>

      {/* Form card — slides up over gradient */}
      <div className="flex-1 -mt-4 rounded-t-3xl bg-background shadow-2xl z-10 relative">
        <form onSubmit={onSubmit} className="flex flex-col gap-6 p-5 pt-6">

          {/* Avatar hint */}
          <div className="flex items-center gap-4 bg-primary/5 border border-primary/15 rounded-2xl p-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <UserCircle size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{profile?.nome_participante || "Seu nome"}</p>
              <p className="text-xs text-muted-foreground">{profile?.cargo_participante || "Cargo não informado"}</p>
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-5">
            <TextField
              name="nome_participante"
              control={control}
              label="Nome Completo"
              placeholder="Digite seu nome completo"
            />
            <TextField
              name="telefone_participante"
              control={control}
              label="Telefone"
              placeholder="(00) 00000-0000"
            />
            <TextareaFieldComponent
              name="bio_participante"
              control={control}
              label="Sobre mim (Bio)"
              placeholder="Conte um pouco sobre você..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSaving}
              leftIcon={<Save size={18} />}
              className="w-full font-bold"
            >
              Salvar Alterações
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
