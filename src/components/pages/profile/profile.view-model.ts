"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProfileService } from "@/resources/services/profile/profile.service";
import { toast } from "sonner";
import { IProfileForm } from "@/resources/services/profile/profile.type";

export function useProfileViewModel() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const profileQuery = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => ProfileService.get(),
    staleTime: 10 * 60 * 1000,
  });

  const profile = profileQuery.data?.data?.[0];

  const { control, handleSubmit, reset } = useForm<IProfileForm>({
    defaultValues: {
      nome_participante: "",
      telefone_participante: "",
      bio_participante: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        nome_participante: profile.nome_participante || "",
        telefone_participante: profile.telefone_participante || "",
        bio_participante: profile.bio_participante || "",
      });
    }
  }, [profile, reset]);

  const updateProfileMutation = useMutation({
    mutationFn: ProfileService.update,
    onSuccess: async (res, variables) => {
      toast.success(res.message || "Perfil atualizado com sucesso!");
      setIsEditing(false);
      const refreshed = await profileQuery.refetch();
      const updatedProfile = refreshed.data?.data?.[0];

      if (session?.user) {
        await update({
          user: {
            ...session.user,
            nome: updatedProfile?.nome_participante || variables.nome_participante || session.user.nome,
            foto_perfil: updatedProfile?.nome_arquivo || session.user.foto_perfil,
          },
        });
      }
    },
    onError: () => {
      toast.error("Erro ao atualizar o perfil.");
    },
  });

  const uploadPictureMutation = useMutation({
    mutationFn: ProfileService.updatePicture,
    onSuccess: async (res) => {
      toast.success(res.message || "Foto de perfil atualizada!");
      const refreshed = await profileQuery.refetch();
      const updatedProfile = refreshed.data?.data?.[0];

      if (session?.user) {
        await update({
          user: {
            ...session.user,
            foto_perfil: updatedProfile?.nome_arquivo || session.user.foto_perfil,
          },
        });
      }
    },
    onError: () => {
      toast.error("Erro ao carregar a foto.");
    },
  });

  const onSubmit = handleSubmit((data) => {
    updateProfileMutation.mutate(data);
  });

  const handleUploadPicture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/jpg";

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("foto_perfil", file);
      uploadPictureMutation.mutate(formData);
    };

    input.click();
  };

  const goBack = () => router.back();

  return {
    profile,
    isLoading: profileQuery.isLoading,
    isEditing,
    setIsEditing,
    control,
    onSubmit,
    handleUploadPicture,
    isUploading: uploadPictureMutation.isPending,
    isSaving: updateProfileMutation.isPending,
    goBack,
  };
}
