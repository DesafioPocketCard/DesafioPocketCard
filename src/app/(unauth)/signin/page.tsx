import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { FormContainer, Politicy, LogoContainer } from "./styles";
import { SiginForm } from "./components";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import splashLogo from "@/assets/icons/pocketCardLogoRounded.svg";
import Image from "next/image";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Login",
};

export default function Sigin() {
  return (
    <RadialWrapper
      HeaderComponent={(props) => (
        <LogoContainer {...props}>
          <Box
            component="div"
            sx={{
              backgroundColor: "#ffffff55",
              border: "1px solid #ffffff",
              padding: 12,
              borderRadius: 12,
            }}
          >
            <Image src={splashLogo} alt="logo" width={180} height={180} />
          </Box>
        </LogoContainer>
      )}
      BodyComponent={(props) => (
        <FormContainer {...props}>
          <SiginForm />
          <Link href="/recuperar-senha">Esqueceu sua senha?</Link>
          <Politicy>
            Desafio Pocket Card é um produto novocred. Clique aqui e veja a
            politica de privacidade.
          </Politicy>
        </FormContainer>
      )}
    />
  );
}
