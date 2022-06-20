import PropTypes from 'prop-types';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

MemberItem.defaultProps = {
  name: null,
  avatar: null,
  role: null,
};

MemberItem.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  role: PropTypes.string,
};

function MemberItem({ name, avatar, role }) {
  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardMedia component="img" height={140} image={avatar} alt={name} />
        <CardContent>
          <Typography component="h6" variant="h6" align="center" sx={{ fontWeight: '600' }}>
            {name}
          </Typography>
          <Typography component="p" variant="p" align="center">
            {role}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MemberItem;
