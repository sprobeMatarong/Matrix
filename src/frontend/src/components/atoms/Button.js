import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const Button = styled(MuiButton)(({ color, theme, variant }) => ({
  backgroundColor: theme.palette[color ? color : 'primary'].main,
  color: variant !== 'outlined' ? '#fff' : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette[color ? color : 'primary'].dark,
  },
  padding: `${theme.spacing(0.9)} ${theme.spacing(2)}`,
  border: `1px solid
    ${
      variant !== 'outlined'
        ? theme.palette[color ? color : 'primary'].main
        : theme.palette.grey[400]
    }`,
}));

export default Button;
