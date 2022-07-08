import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { blueGrey } from '@mui/material/colors';
import { List as MUIList, ListItem, Typography } from '@mui/material';

List.defaultProps = {
  items: [],
  inline: false,
  variant: 'body2',
  color: blueGrey['A100'],
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  inline: PropTypes.bool,
  variant: PropTypes.string,
  color: PropTypes.string,
};

function List({ items, inline, variant, color, ...rest }) {
  const styles = {
    display: 'flex',
    flexDirection: inline ? 'row' : 'column',
  };

  return (
    <MUIList style={styles} {...rest}>
      {items.map(({ label, url }, key) => {
        return (
          <ListItem dense disableGutters key={key}>
            <Typography
              component={Link}
              to={url}
              variant={variant}
              sx={{ textDecoration: 'none', color }}
            >
              {label}
            </Typography>
          </ListItem>
        );
      })}
    </MUIList>
  );
}

export default List;
