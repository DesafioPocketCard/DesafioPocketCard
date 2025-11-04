import React from "react";
import { HeaderContainer, Profile } from "./styles";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function UserDialogHeader() {
  const session = useSession();

  return (
    <HeaderContainer>
      <Profile src={session.data?.user.foto_perfil} />
      <Box>
        <Typography component="span">{session.data?.user.nome}</Typography>
        <Typography component="span">{session.data?.user.email}</Typography>
      </Box>
    </HeaderContainer>
  );
}
