import { styled } from "@mui/material";

export const Container = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(2),
    "& > a": {
        ...(theme.fonts?.["pf-body"] || {}),
        color: theme.palette.base?.["900"] || "#404040",
        transition: "0.3s",
        "&:hover": {
            color: theme.palette.primary?.["400"] || theme.palette.primary.main,
        },
    },
}));