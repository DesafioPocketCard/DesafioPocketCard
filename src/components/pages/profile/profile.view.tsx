import React from "react";
import Image from "next/image";
import { ArrowLeft, Camera, User, Edit3, Save, RefreshCw } from "lucide-react";
import { useProfileViewModel } from "./profile.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";
import TextField from "@/components/shared/fields/text-field/text-field.component";

type Props = ReturnType<typeof useProfileViewModel>;

export function ProfileView({
  profile,
  isLoading,
  isEditing,
  setIsEditing,
  control,
  onSubmit,
  handleUploadPicture,
  isUploading,
  isSaving,
  goBack,
}: Props) {
  if (isLoading && !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <RefreshCw className="animate-spin text-primary-500" size={40} />
        <p className="text-gray-500 font-medium">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              className="bg-white/20 text-white rounded-xl"
            >
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 rounded-3xl border-4 border-white/30 overflow-hidden bg-white/20 shadow-lg">
              {profile?.nome_arquivo ? (
                <Image
                  src={profile.nome_arquivo}
                  alt="Avatar"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/50">
                  <User size={48} />
                </div>
              )}
              <button
                className="absolute bottom-1 right-1 w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center border-2 border-white cursor-pointer shadow-md transition-transform active:scale-90 disabled:opacity-50"
                onClick={handleUploadPicture}
                disabled={isUploading}
              >
                {isUploading ? <RefreshCw size={16} className="animate-spin" /> : <Camera size={16} />}
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-white leading-tight">
                {profile?.nome_participante}
              </h2>
              <p className="text-sm text-white/80 font-medium">
                {profile?.cargo_participante}
              </p>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Metas Atingidas", value: profile?.metas_atingidas || 0 },
            { label: "Desafios", value: profile?.desafios_concluidos || 0 },
            { label: "Dias Ativos", value: profile?.dias_ativos || 0 },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-1 shadow-sm"
            >
              <span className="text-xl font-extrabold text-primary-600 leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-400 text-center tracking-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col gap-6 shadow-sm">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-base font-bold text-gray-800">Dados Pessoais</h3>
            {!isEditing ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                leftIcon={<Edit3 size={16} />}
                className="text-primary-600"
              >
                Editar
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSaving}
                  leftIcon={<Save size={16} />}
                >
                  Salvar
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <TextField
              name="nome_participante"
              control={control}
              label="Nome Completo"
              disabled={!isEditing}
            />
            <TextField
              name="telefone_participante"
              control={control}
              label="Telefone"
              disabled={!isEditing}
            />
            <TextField
              name="bio_participante"
              control={control}
              label="Sobre mim (Bio)"
              disabled={!isEditing}
              className="col-span-1"
            />
          </div>
        </form>
      </div>
    </RadialWrapper>
  );
}
