"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Typography } from "@mui/material";
import { Button } from "@/components/Buttons";
import { Menu, TitleContainer } from "./styles";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <TitleContainer {...props}>
          <Typography>{session.data?.user.nome}</Typography>
          <Typography component="span">{session.data?.user.email}</Typography>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Menu {...props}>
          <Typography component="h1">Por onde deseja começar?</Typography>
          <Button variant="outlined" onClick={() => router.push("/campains")}>
            Campanhas
          </Button>
          {/* <Button variant="outlined" onClick={() => router.push("/challenges")}>
            Desafios
          </Button> */}
          <Typography>
            Não é {session.data?.user.nome}?
            <Typography component="a" onClick={() => signOut()}>
              Clique aqui para sair
            </Typography>
          </Typography>
        </Menu>
      )}
    />
  );
}
