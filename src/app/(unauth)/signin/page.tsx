import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { FormContainer, Politicy, LogoContainer } from "./styles";
import { SiginForm } from "./components";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import Logo from "@/components/UI/Logo";
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
            <Logo logoType="180x180" alt="logo" />
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
