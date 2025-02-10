"use client";

import TabList from "@mui/lab/TabList";
import { Tab, styled } from "@mui/material";

interface TabItemProps {
  revertcolorpalette?: boolean;
  strongTabs?: boolean;
}

const TabContainer = styled(TabList)(({ theme, orientation }) => ({
  paddingTop: orientation === "vertical" ? "20px" : "0px",
  "& .MuiTabs-indicator": { display: "none" },
  "& .MuiTabs-scrollButtons": {
    "&.Mui-disabled": { opacity: 0.3 },
    color: theme.palette.primary[400],
  },
  maxWidth: 1540,
  alignItems: "center",
}));

const TabItem = styled(Tab)<TabItemProps>(
  ({ theme, revertcolorpalette, strongTabs }) => ({
    background: revertcolorpalette
      ? theme.palette.primary[400]
      : theme.palette.primary[50],
    color: revertcolorpalette
      ? theme.palette.base[50]
      : theme.palette.primary.main,
    padding: revertcolorpalette ? "10px 33px" : "10px",
    fontSize: strongTabs ? "16px" : "inherit",
    margin: strongTabs ? "0px 10px 20px 10px" : "5px",
    fontWeight: revertcolorpalette ? "normal" : strongTabs ? "700" : "normal",
    fontFamily: "General Sans",
    borderRadius: 5,
    transition: ".3s",
    textTransform: "capitalize",
    minHeight: 10,
    "&.Mui-selected": {
      backgroundColor: revertcolorpalette
        ? theme.palette.primary[50]
        : theme.palette.primary[400],
      color: revertcolorpalette
        ? theme.palette.primary.main
        : theme.palette.base[50],
      fontWeight: strongTabs ? "bold" : "normal",
      borderColor: "transparent",
    },
  }),
);

export { TabItem, TabContainer };
