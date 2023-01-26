import React from 'react';
import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ tags, webformatURL, largeImageURL, selectImage, }) => {
    return (
    <li>
        <img
            className={style.ImageGalleryImage}
            src={webformatURL}
            alt={tags}
            onClick={() => selectImage(largeImageURL)}
        />
  </li>)
};

ImageGalleryItem.propTypes = {
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    selectImage: PropTypes.func.isRequired,
  };