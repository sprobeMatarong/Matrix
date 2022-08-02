import PropTypes from 'prop-types';
import BodyText from 'components/atoms/BodyText';

function Yen({ amount }) {
  return (
    <BodyText>
      {Number(amount).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })}
    </BodyText>
  );
}

Yen.defaultProps = {
  amount: 0,
};

Yen.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default Yen;
