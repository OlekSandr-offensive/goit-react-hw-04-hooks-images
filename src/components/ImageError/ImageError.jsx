import React from 'react';
import errorImage from './Cat-cry.jpg';
import './ImageError.scss';
import PropTypes from 'prop-types';

const ImageError = ({ message }) => {
  return (
    <div role="alert" className="image-error">
      <img src={errorImage} width="240" alt="Cat-cry" />
      <p>{message}</p>
    </div>
  );
};

ImageError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ImageError;
