import css from '../Button/Button.module.css'

const Button = ({ handleClick }) => (
  <button type="button" className={css.button} onClick={handleClick}>
    Load more
  </button>
);
export default Button;
