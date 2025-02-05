"use client";

import { Box, styled } from "@mui/material";

const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.base[50],
  minHeight: "100vh",
  paddingTop: "60px",
}));

const Main = styled(Box)({
  padding: "0 12px 12px 12px",
});

export { Wrapper, Main };
