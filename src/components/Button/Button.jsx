import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';

export const Button = ({ loadMore }) => {
  return (
    <div className={style.buttonContainer}>
    <button type="button" onClick={loadMore} className={style.button}>
      Load more
    </button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};