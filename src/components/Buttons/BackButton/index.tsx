import { IconButton, IconButtonProps } from "@mui/material";
import Image from "next/image";
import React from "react";
import arrowLeft from "@/assets/icons/arrow-left.svg";

export default function BackButton(props: IconButtonProps) {
  return (
    <IconButton {...props}>
      <Image alt="voltar" src={arrowLeft} width={24} height={24} />
    </IconButton>
  );
}
