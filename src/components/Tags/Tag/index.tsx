import React, { PropsWithChildren } from "react";
import { TagContainer } from "./styles";

export default function Tag({ children }: PropsWithChildren) {
  return <TagContainer component="span">{children}</TagContainer>;
}
