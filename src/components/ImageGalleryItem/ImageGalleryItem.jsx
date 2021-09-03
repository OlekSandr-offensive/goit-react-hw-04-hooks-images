import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, largeImg }) => {
  const { webformatURL, tags } = image;
  return (
    <li onClick={largeImg} className="ImageGalleryItem">
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImg: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
};

export default ImageGalleryItem;
