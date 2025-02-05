import { Avatar, Box, styled } from "@mui/material";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "20px 30px",
  backgroundColor: theme.palette.secondary[50],
  "& > div": {
    display: "flex",
    flexDirection: "column",
    "& > span:nth-child(1)": {
      ...theme.fonts["h4-subtitle"],
      color: theme.palette.primary[500],
    },
    "& > span:nth-child(2)": {
      ...theme.fonts["pf-body"],
      color: theme.palette.secondary[500],
    },
  },
}));

const Profile = styled(Avatar)(() => ({
  width: "44px",
  height: "44px",
}));

export { HeaderContainer, Profile };
