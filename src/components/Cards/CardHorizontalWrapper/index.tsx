import { Box } from "@mui/material";
import React from "react";
import { SCardHorizontalWrapper } from "./styles";

interface Props<T> {
  renderItem: (item: T, index: number) => React.ReactNode;
  data: T[];
}

export default function CardHorizontalWrapper<T>({
  data,
  renderItem,
}: Props<T>) {
  return (
    <SCardHorizontalWrapper>{data.map(renderItem)}</SCardHorizontalWrapper>
  );
}
