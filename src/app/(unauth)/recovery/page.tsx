import { Metadata } from "next";
import React from "react";
import { FormContainer, Politicy, LogoContainer } from "./styles";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import Logo from "@/components/UI/Logo";
import { Box } from "@mui/material";
import { RecoveryFormEmail } from "./components";
import RecoveryController from "./components/RecoveryController";

export const metadata: Metadata = {
  title: "Login",
};

export default function Recovery() {
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
          <RecoveryController />
          <Politicy>
            Desafio Pocket Card é um produto novocred. Clique aqui e veja a
            politica de privacidade.
          </Politicy>
        </FormContainer>
      )}
    />
  );
}
