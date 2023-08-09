import PropTypes from 'prop-types';
import { Component } from 'react';
import css from '../Searchbar/Searchbar.module.css';
import { Notify } from 'notiflix';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value: value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    const query = this.state.value;

    e.preventDefault();

    if (query === '') {
      return Notify.info('Please, enter search word!');
    }

    this.props.handleSearch(query);

    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Searchbar;
