import { Box, Typography } from "@mui/material";
import { CardContainer } from "./styles";
import { INotificationCardProps } from "./types";
import { Button } from "@/components/Buttons";

export default function NotificationCard({
  message,
  coins,
}: INotificationCardProps) {
  return (
    <CardContainer component="li">
      <Typography>{message}</Typography>
      {coins && (
        <Typography>
          <Typography component="span">{coins} FITCOINS</Typography> foram
          creditados na sua carteira.
        </Typography>
      )}
      <Button variant="outlined">Ver mais</Button>
    </CardContainer>
  );
}
