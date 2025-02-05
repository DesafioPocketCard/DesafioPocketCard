import { Dialog, DialogTitle, styled } from "@mui/material";
import { text } from "stream/consumers";

const DialogStyled = styled(Dialog)(({ theme }) => ({
   "& .MuiDialog-paper": {
    width: "500px", 
    height:'208px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },
  "& .MuiDialogActions-root": {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },
  "& .MuiButton-root": {
    width: '196px',
    height: '50px',
    fontFamily: 'General Sans',
    fontSize: '23px',
    color:theme.palette.base[50],
    fontWeight: '500',
    textTransform: 'none',
  },

    
  }));


const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
    display:'flex',
    textAlign:'center',
    justifyContent:'center',
    fontFamily:'General Sans',
    fontSize:'18px',
    fontWeight:'500',
    color: '#000000',
    }));


export { DialogTitleStyled,DialogStyled };