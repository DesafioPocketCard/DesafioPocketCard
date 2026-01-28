"use client";

import React, { useState } from "react";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import {
  Container,
  GridContainer,
  HeaderContainer,
  TitleContainer,
} from "../rescue-points/styles";
import { Header } from "@/components/Layout";
import { 
    IconButton, 
    Typography, 
    Box, 
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Divider,
    Badge
} from "@mui/material";
import { ArrowBackIos, ContentCopy, Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridCardImage } from "@/components/Cards";
import Image from "next/image";
import shoppingbag from "@/assets/icons/shopping-bag-white.svg"
import { useQuery,useQueries } from "@tanstack/react-query";
import GiftService from "@/services/gift.service";
import CartService from "@/services/cart.service";
import MyRewardsService, { IMyReward } from "@/services/my_rewards.service";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function MyRewardsPage() {
  const router = useRouter();
  
  // Estado para controlar qual prêmio foi clicado
  const [selectedReward, setSelectedReward] = useState<IMyReward | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["my-rewards"],
    queryFn: () => MyRewardsService.getAll(),
  });

  const rewards = data?.data || [];

    const [cartQuery,rewardsQuery] = useQueries({
      queries: [
        {
          queryKey: ["cart"],
          queryFn: () => CartService.get(),
        },
        {
          queryKey: ["my-rewards"],
          queryFn: () => MyRewardsService.getAll(),
        },
 
      ],
    });


  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Código copiado!");
  };

   const cartData = cartQuery.data?.data?.sacola;
  const saldoUsuario = cartQuery.data?.data?.total_pontos_usuario || 0;
  

  return (
    <>
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <TitleContainer {...props}>
          <Header />

          <HeaderContainer sx={{ 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', // <--- MUDEI AQUI (antes era 'center')
    width: '100%',
    mt: 2
}}>
    
    {/* --- BLOCO ESQUERDO (Ícone + Textos) --- */}
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}>
        
        {/* 1. Ícone (Seta) */}
        {/* Adicionei 'mt: 0.5' para descer a seta um pouquinho e alinhar com o texto */}
        <IconButton onClick={() => router.back()} sx={{ padding: 0, mt: 0.5 }}>
            <ArrowBackIos htmlColor="white" fontSize="small" />
        </IconButton>

        {/* 2. Coluna de Textos */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="h1" sx={{ color: 'white', fontWeight: 'semibold', fontSize: '1.6rem', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                Prêmios Resgatados
            </Typography>

            <Typography sx={{ color: 'white', fontSize: '1rem', fontWeight: 500 }}>
                Você tem: {saldoUsuario} pontos
            </Typography>
                        <Typography>Histórico de resgates realizados</Typography>
        </Box>

    </Box>

    {/* --- BLOCO DIREITO (Sacola) --- */}
    <Box>
        {/* Aqui mantivemos o padding original para alinhar com o topo do bloco esquerdo */}
        <IconButton onClick={() => router.push(`/rescue-points/cart`)} sx={{ padding: 0.5 }}>
            <Badge
                badgeContent={cartData?.itens.length || 0}
                color="error"
            >
                <Image
                src={shoppingbag}
                alt="shoppingbag"
                width={32}
                height={32}
                />
            </Badge>
        </IconButton>
    </Box>

</HeaderContainer>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container
          {...props}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {isLoading && (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress color="secondary" />
            </Box>
          )}

          {!isLoading && rewards.length === 0 && (
            <Typography textAlign="center" color="textSecondary" mt={4}>
              Você ainda não resgatou nenhum prêmio.
            </Typography>
          )}

          <GridContainer>
            {rewards.map((reward, index) => (
              <GridCardImage
                key={index}
                title={reward.nome}
                icon={reward.img_premio}
                
                onClick={() => setSelectedReward(reward)} 
                sx={{
                  padding: "8px 20px",
                  height: "100%",
                  cursor: "pointer"
                }}
                points={format(parseISO(reward.data_resgate), "dd/MM/yyyy", { locale: ptBR })}
              />
            ))}
          </GridContainer>
        </Container>
      )}
    />

   
    <Dialog 
        open={!!selectedReward} 
        onClose={() => setSelectedReward(null)}
        fullWidth
        maxWidth="xs"
    >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Detalhes do Voucher
            <IconButton onClick={() => setSelectedReward(null)}>
                <Close />
            </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
            {selectedReward && (
                <Box display="flex" flexDirection="column" gap={2}>
                    
                    {/* Imagem e Nome */}
                    <Box textAlign="center" mb={1}>
                        <img 
                            src={selectedReward.img_premio} 
                            alt={selectedReward.nome} 
                            style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 8 }} 
                        />
                        <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                            {selectedReward.nome}
                        </Typography>
                    </Box>

                    
                    {selectedReward.codigo_voucher && (
                        <Box>
                            <Typography variant="caption" color="textSecondary">
                                Código de Resgate / PIN
                            </Typography>
                            <Box display="flex" gap={1} alignItems="center">
                                <TextField 
                                    fullWidth 
                                    value={selectedReward.codigo_voucher} 
                                    InputProps={{ readOnly: true }} 
                                    size="small"
                                />
                                <IconButton onClick={() => handleCopy(selectedReward.codigo_voucher!)}>
                                    <ContentCopy />
                                </IconButton>
                            </Box>
                        </Box>
                    )}

                    
                    {selectedReward.serial_numero && (
                        <Box>
                            <Typography variant="caption" color="textSecondary">
                                Número de Serial
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                                {selectedReward.serial_numero}
                            </Typography>
                        </Box>
                    )}

                    <Divider />

                   
                    {selectedReward.instrucao_premio && (
                        <Box>
                            <Typography variant="caption" color="textSecondary">
                                Como utilizar:
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}
                                dangerouslySetInnerHTML={{ __html: selectedReward.instrucao_premio }} 
                            />
                        </Box>
                    )}
                </Box>
            )}
        </DialogContent>
        
        <DialogActions sx={{ flexDirection: 'column', gap: 1, p: 2 }}>
           
            {selectedReward?.url_premio && (
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    href={selectedReward.url_premio}
                    target="_blank"
                >
                    Acessar Site de Resgate
                </Button>
            )}
            
            <Button onClick={() => setSelectedReward(null)} fullWidth color="inherit">
                Fechar
            </Button>
        </DialogActions>
    </Dialog>
    </>
  );
}