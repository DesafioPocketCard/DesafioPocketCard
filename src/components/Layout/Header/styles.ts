import { AppBar, Avatar, styled } from "@mui/material";

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary[50],
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 12px",
  height: "60px",
  borderRadius: "0 0 20px 20px",
  "& > div": {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
}));

const Profile = styled(Avatar)(() => ({
  width: "44px",
  height: "44px",
}));

export { HeaderContainer, Profile };
