"use client";

import React from "react";
import { ProfileInfo, ProfileImageContainer } from "./styles";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import shoppingbag from "@/assets/icons/shopping-bag.svg";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import Image from "next/image";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Buttons";
import GiftService from "@/services/gift.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CartService from "@/services/cart.service";
import useNotifier from "@/hooks/useNotifier"; 

type Props = {
  params: {
    id: string;
  };
};

export default function Product({ params: { id } }: Props) {
  const router = useRouter();

const notify = useNotifier(); 
  const queryClient = useQueryClient();

const { data } = useQuery({
    queryKey: ["gift-by-id", id],
    queryFn: () => GiftService.getById(id),
    enabled: !!id,

    
  });

  const addMutation = useMutation({
    mutationFn: () => CartService.adicionarItem(Number(id), 1), 
    onSuccess: (response) => {
      notify("Produto adicionado à sacola!", "success");
      
      
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      
     
      router.push("/rescue-points/cart");
    },
    onError: (error: any) => {
      notify(error.message || "Erro ao adicionar produto.", "error");
    },
  });

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <ProfileImageContainer {...props}>
          {data?.data[0]?.img_premio && (
            <Image
              src={data?.data[0].img_premio}
              alt="Foto do premio"
              layout="fill"
              objectFit="contain"
              unoptimized
            />
          )}
          <IconButton onClick={() => router.back()}>
            <Image src={arrowLeft} alt="voltar" width={24} height={24} />
          </IconButton>
          <IconButton onClick={() => router.push(`/rescue-points/cart`)}>
            <Image src={shoppingbag} alt="shoppingbag" width={24} height={24} />
          </IconButton>
        </ProfileImageContainer>
      )}
      BodyComponent={(props) => (
        <ProfileInfo component="section" {...props}>
          <Typography component="h1">{data?.data[0].nome}</Typography>
          <Typography className="description">
            <Box
              dangerouslySetInnerHTML={{
                __html: data?.data[0].descricao_premio || "",
              }}
            />
          </Typography>
          <Typography className="rescue-points">
            Resgate: {data?.data[0].qtde_pontos_resgate} pontos
          </Typography>
          <Button 
            onClick={() => addMutation.mutate()}
            loading={addMutation.isPending} 
            disabled={addMutation.isPending}
          >
            Adicionar à sacola
          </Button>
        </ProfileInfo>
      )}
    />
  );
}
