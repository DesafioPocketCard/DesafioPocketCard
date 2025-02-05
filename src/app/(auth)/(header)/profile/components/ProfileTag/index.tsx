import React from "react";
import { IProfileTagProps } from "./types";
import { TagContainer } from "./styles";
import { Typography } from "@mui/material";
import { Tag } from "@/components/Tags";

export default function ProfileTag({ title, count }: IProfileTagProps) {
  return (
    <TagContainer>
      <Tag>{count}</Tag>
      <Typography component="span">{title}</Typography>
    </TagContainer>
  );
}
