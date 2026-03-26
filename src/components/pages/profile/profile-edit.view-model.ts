"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProfileService } from "@/resources/services/profile/profile.service";
import { toast } from "sonner";
import { IProfileForm } from "@/resources/services/profile/profile.type";

export function useProfileEditViewModel() {
  const { data: session, update } = useSession();
  const router = useRouter();

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
    mutationFn: (data: IProfileForm) => ProfileService.update(data),
    onSuccess: async (res, variables) => {
      toast.success(res.message || "Perfil atualizado com sucesso!");
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

      router.back();
    },
    onError: () => {
      toast.error("Erro ao atualizar o perfil.");
    },
  });

  const onSubmit = handleSubmit((data) => {
    updateProfileMutation.mutate(data);
  });

  const goBack = () => router.back();

  return {
    profile,
    isLoading: profileQuery.isLoading,
    control,
    onSubmit,
    isSaving: updateProfileMutation.isPending,
    goBack,
  };
}
