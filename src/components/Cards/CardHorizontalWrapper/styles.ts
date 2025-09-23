import { Box, styled } from "@mui/material";

export const SCardHorizontalWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    gap: "12px",
    width: "92vw",
    alignSelf: "center",
    overflowX: "scroll",
    scrollSnapType: "x mandatory",
    "&::-webkit-scrollbar": {
        display: "none",
    },
    "& .card": {
        scrollSnapAlign: "center",
        flexShrink: 0
    }
}))