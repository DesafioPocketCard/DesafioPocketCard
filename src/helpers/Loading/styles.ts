"use client";

import fadeInOut from "@/global/animations/fadeInOut";
import { Box, styled } from "@mui/material";
import { ILoadingProps } from "./types";

const Wrapper = styled(Box)({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(6px)",
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "10000",
});

const sizes = {
  lg: "50px 70px 50px/70px 50px 70px",
  md: "40px 60px 40px/60px 40px 60px",
  sm: "25px 45px 25px/45px 25px 45px",
};

const CircleContainer = styled(Box)<Pick<ILoadingProps, "size">>(
  ({ theme, size = "lg" }) => ({
    display: "grid",
    gridTemplate: sizes[size],
    [theme.breakpoints.down("md")]: {
      gridTemplate: size === "sm" ? sizes.md : sizes[size],
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplate: sizes.sm,
    },
  }),
);

const Circle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary[100],
  borderRadius: "100%",
  transition: "0.3s",
  opacity: 0,
  "&.circle-0": {
    gridColumn: "1",
    gridRow: "2",
  },
  "&.circle-1": {
    gridColumn: "2",
    gridRow: "1",
  },
  "&.circle-2": {
    gridColumn: "3",
    gridRow: "2",
  },
  "&.circle-3": {
    gridColumn: "2",
    gridRow: "3",
  },
  "&.visible": {
    animation: `${fadeInOut} 0.3s ease-in forwards`,
  },
}));

export { Wrapper, Circle, CircleContainer };
