"use client";

import React from "react";
import { NotificationsList, TitleContainer } from "./styles";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import notificationLarge from "@/assets/icons/notification-lg.svg";
import Image from "next/image";
import { Box, CircularProgress, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { OutlinedTag } from "@/components/Tags";
import { NotificationCard } from "@/components/Cards";
import { useQuery } from "@tanstack/react-query"; // Importar React Query
import NotificationService from "@/services/notification.service"; // Importar Service


export default function Notifications() {
  
  // 1. Hook para buscar dados
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => NotificationService.getAll()
  });

  // Extrair dados da resposta da API
  const notificationGroups = data?.data?.data || []; // Array agrupado
  const totalNotifications = data?.data?.total || 0; // Contagem total

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <TitleContainer {...props}>
          <Image src={notificationLarge} alt="logo" width={48} height={60} />
          <Typography component="span">Você tem</Typography>
          <Typography component="span">
             {/* Mostra loading ou o número real */}
             {isLoading ? "..." : `${totalNotifications} notificações`}
          </Typography>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <NotificationsList component="ul" {...props}>
          
          {/* Loading State */}
          {isLoading && (
             <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress color="secondary" />
             </Box>
          )}

          {/* Empty State (Sem notificações) */}
          {!isLoading && notificationGroups.length === 0 && (
             <Typography textAlign="center" color="textSecondary" mt={4}>
                Nenhuma notificação encontrada.
             </Typography>
          )}

          {/* Lista Real */}
          {notificationGroups.map(({ date, items }) => (
            <Box key={date} component="li">
              {/* Ajuste no Date-fns para evitar erro de fuso horário se necessário */}
              <OutlinedTag>{format(parseISO(date), "dd/MM")}</OutlinedTag>
              <Box component="ul">
                {items.map((notification, index) => (
                  <NotificationCard
                    key={`${date}-${index}`} // Key única composta
                    message={notification.message}
                    coins={notification.received_credits}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </NotificationsList>
      )}
    />
  );
}