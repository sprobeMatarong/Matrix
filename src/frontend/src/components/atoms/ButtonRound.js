import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const ButtonRound = styled(MuiButton)(({ theme }) => ({
  backgroundColor: 'none',
  color: 'white',
  padding: `${theme.spacing(2)} ${theme.spacing(6)}`,
  border: '3px solid white',
  fontWeight: 700,
  letterSpacing: '2px',
  borderRadius: 64,
}));

export default ButtonRound;
