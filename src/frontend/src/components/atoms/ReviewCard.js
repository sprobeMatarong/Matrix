import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

ReviewCard.defaultProps = {
  review: {
    avatar: null,
    name: null,
    comment: null,
    rating: 0,
  },
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    comment: PropTypes.string,
    rating: PropTypes.number,
  }),
};

function ReviewCard({ review }) {
  const { avatar, name, comment, rating } = review;

  const stars = () => {
    return (
      <Box sx={{ mb: 2 }}>
        {[...Array(5)].map((star, index) => {
          index++;
          return index <= rating ? (
            <StarIcon key={index} color="warning" />
          ) : (
            <StarBorderIcon key={index} />
          );
        })}
      </Box>
    );
  };

  return (
    <Card sx={{ py: 3, minHeight: 220 }}>
      <CardContent sx={{ height: '100%' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Avatar alt={name} src={avatar} sx={{ margin: '0 auto', mb: 1 }} />
          <Typography sx={{ fontWeight: 'bold' }} color="text.secondary">
            {name}
          </Typography>

          {stars()}
        </Box>

        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          variant="body2"
          component="div"
          align="center"
        >
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
