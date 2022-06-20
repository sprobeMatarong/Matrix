import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';

HeroImage.defaultProps = {
  image: null,
  height: '100vh',
};

HeroImage.propTypes = {
  image: PropTypes.string,
  children: PropTypes.any,
  height: PropTypes.string,
};

function HeroImage({ image, children, height, ...rest }) {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundPosition: 'center',
    height: height,
  };

  return (
    <Paper elevation={0} style={styles} {...rest}>
      {children}
    </Paper>
  );
}

export default HeroImage;
