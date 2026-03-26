"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProfileService } from "@/resources/services/profile/profile.service";
import { toast } from "sonner";

export function useProfileViewModel() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const profileQuery = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => ProfileService.get(),
    staleTime: 10 * 60 * 1000,
  });

  const profile = profileQuery.data?.data?.[0];

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
  const goToEdit = () => router.push("/profile/edit");

  return {
    profile,
    isLoading: profileQuery.isLoading,
    handleUploadPicture,
    isUploading: uploadPictureMutation.isPending,
    goBack,
    goToEdit,
  };
}
