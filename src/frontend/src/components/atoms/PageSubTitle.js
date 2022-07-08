import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Styled = styled(Typography)(() => ({
  fontSize: '1rem',
  marginBottom: '2rem',
}));

const PageSubTitle = ({ content, align }) => {
  return (
    <Styled component="p" align={align}>
      {content}
    </Styled>
  );
};

PageSubTitle.defaultProps = {
  content: null,
  align: 'center',
};

PageSubTitle.propTypes = {
  content: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center']),
};

export default PageSubTitle;
