import { Typography } from '@mui/material';
import { NotFoundContainer } from './styles/notFound';

export default function PageNotFound() {
  return (
    <NotFoundContainer>
      <Typography component="h1">
        <Typography component="span">404</Typography> - Pagina não encontrada.
      </Typography>
    </NotFoundContainer>
  );
}
