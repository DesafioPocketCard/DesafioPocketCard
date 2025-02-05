import React from "react";
import { NotificationsList, TitleContainer } from "./styles";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import notificationLarge from "@/assets/icons/notification-lg.svg";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { OutlinedTag } from "@/components/Tags";
import { NotificationCard } from "@/components/Cards";

const notifications = [
  {
    date: "2024-09-05",
    items: [
      {
        message: "PARABÉNS! Você concluíu o desafio da casa do poço.",
        received_credits: 20,
      },
      {
        message: "SHOW! Você atingiu a meta de 200 visitas ao stand.",
        received_credits: 40,
      },
    ],
  },
  {
    date: "2024-03-09",
    items: [
      {
        message: "SHOW! Você atingiu a meta de 100 visitas ao stand.",
        received_credits: 30,
      },
      {
        message: "SHOW! Você atingiu a meta de 50 visitas ao stand.",
        received_credits: 20,
      },
    ],
  },
  {
    date: "2024-01-15",
    items: [
      {
        message: "PARABÉNS! Você concluíu o desafio da torre.",
        received_credits: 20,
      },
      {
        message: "PARABÉNS! Você concluíu o desafio da casa do poço.",
        received_credits: 20,
      },
    ],
  },
];

export default function Notifications() {
  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <TitleContainer {...props}>
          <Image src={notificationLarge} alt="logo" width={48} height={60} />
          <Typography component="span">Você tem</Typography>
          <Typography component="span">20 notificações</Typography>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <NotificationsList component="ul" {...props}>
          {notifications.map(({ date, items }) => (
            <Box key={date} component="li">
              <OutlinedTag>{format(parseISO(date), "dd/MM")}</OutlinedTag>
              <Box component="ul">
                {items.map((notification, index) => (
                  <NotificationCard
                    key={index}
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
