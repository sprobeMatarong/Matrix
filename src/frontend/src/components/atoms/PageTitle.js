import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Styled = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '2rem',
  marginBottom: '1rem',
}));

const PageTitle = ({ title, align }) => {
  return (
    <Styled component="h1" align={align} gutterBottom>
      {title}
    </Styled>
  );
};

PageTitle.defaultProps = {
  title: null,
  align: 'center',
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center']),
};

export default PageTitle;
