import PropTypes from 'prop-types';
import { ImageList } from '@mui/material';
import QuiltedImageListItem from '../atoms/QuiltedImageListItem';

QuiltedImageList.defaultProps = {
  images: [],
  rowHeight: 121,
  maxCols: 4,
};

QuiltedImageList.propTypes = {
  images: PropTypes.array,
  rowHeight: PropTypes.number,
  maxCols: PropTypes.number,
};

function QuiltedImageList({ images, rowHeight, maxCols }) {
  return (
    <ImageList variant="quilted" cols={maxCols} rowHeight={rowHeight}>
      {images.map((item, key) => (
        <QuiltedImageListItem
          key={key}
          title={item.title}
          image={item.image}
          rowHeight={rowHeight}
          cols={item.cols}
          rows={item.rows}
        />
      ))}
    </ImageList>
  );
}

export default QuiltedImageList;
