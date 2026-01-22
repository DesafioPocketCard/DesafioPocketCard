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
    Divider
} from "@mui/material";
import { ArrowBackIos, ContentCopy, Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridCardImage } from "@/components/Cards";
import { useQuery } from "@tanstack/react-query";
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


  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Código copiado!");
  };

  return (
    <>
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <TitleContainer {...props}>
          <Header />
          <HeaderContainer>
            <IconButton onClick={() => router.back()}>
              <ArrowBackIos htmlColor="white" fontSize="small" />
            </IconButton>
            <Typography component="h1">Meus Prêmios</Typography>
            <Typography>Histórico de resgates realizados</Typography>
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
                            style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 8 }} 
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