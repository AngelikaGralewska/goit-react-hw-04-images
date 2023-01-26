import React from 'react';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css'


export const Searchbar = ({ handleSubmit }) => {
    const onSubmit = event => {
    event.preventDefault();

    const query = event.target.elements.query.value.trim();

    if (!query) 
    return;

    handleSubmit(query);
    event.target.reset();
  };

    return (
      <header className={style.searchBar}>
        <form onSubmit={onSubmit}>
          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            name="query"
            placeholder="Search images and photos"
          />
          <button type="submit" className={style.searchFormButton}>
            search
          </button>
        </form>
      </header>
    );
  }


Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};