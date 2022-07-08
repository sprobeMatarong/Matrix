import ReviewCard from '../atoms/ReviewCard';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

ReviewSlider.defaultProps = {
  reviews: [],
};

ReviewSlider.propTypes = {
  reviews: PropTypes.array,
};

function ReviewSlider({ reviews, ...rest }) {
  return (
    <Box {...rest}>
      <Swiper
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          425: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[Navigation]}
        className="review-slider"
      >
        {reviews.map((review, key) => {
          return (
            <SwiperSlide key={key}>
              <ReviewCard review={review} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

export default ReviewSlider;
