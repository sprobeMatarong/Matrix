import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

Section.defaultProps = {
  fullWidth: false,
  heading: null,
  background: 'none',
};

Section.propTypes = {
  fullWidth: PropTypes.bool,
  heading: PropTypes.string,
  children: PropTypes.any,
  background: PropTypes.string,
};

function Section({ fullWidth, heading, children, background, ...rest }) {
  return (
    <Box component="section" sx={{ py: 12, backgroundColor: background }}>
      <Container maxWidth={fullWidth ? 'lg' : false} {...rest}>
        <Typography
          component="h4"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          {heading}
        </Typography>

        {children}
      </Container>
    </Box>
  );
}

export default Section;
