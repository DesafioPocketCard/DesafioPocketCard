import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.primary,
        fontSize: theme.fonts['h5-body-large'],
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: theme.fonts['h5-body-large'],
        color: theme.palette.primary,
    },
    [`&.${tableCellClasses.root}`]: {
        boxShadow: 'none',
        borderBottom: 'none',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    border: 'none',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.base[200],
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&.disabled,&.error': {
        backgroundColor: 'rgba(216, 0, 0, 0.1)',
    },
    '&.active': {
        backgroundColor: 'rgba(0, 216, 0, 0.1)',
    },
    '&.info': {
        backgroundColor: 'rgba(187, 222, 251, 0.6)',
    },
    '&.warning': {
        backgroundColor: 'rgba(255, 223, 186, 1)',
    },
    '&.requested': {
        backgroundColor: 'rgba(255, 246, 168, 0.8)',
    },
    '&.recived': {
        backgroundColor: 'rgba(134, 239, 172, 1)',
    },
    '&.delivered': {
        backgroundColor: '#dcfce7',
    },
    '&.canceled': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        textDecoration: 'line-through',
        color: theme.palette.error.main,
    },
    '&.late': {
        backgroundColor: theme.palette.error[100],
    },
}));

export { StyledTableCell, StyledTableRow }