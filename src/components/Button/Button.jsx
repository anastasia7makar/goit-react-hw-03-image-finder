import PropTypes from 'prop-types';
import css from '../Button/Button.module.css';

const Button = ({ handleClick }) => (
  <button type="button" className={css.button} onClick={handleClick}>
    Load more
  </button>
);

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Button;
