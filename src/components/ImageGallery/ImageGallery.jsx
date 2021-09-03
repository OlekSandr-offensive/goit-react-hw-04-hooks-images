import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  render() {
    const { images, largeImg } = this.props;

    return (
      <>
        <ul className="ImageGallery">
          {images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                image={image}
                largeImg={() => {
                  largeImg(image.largeImageURL);
                }}
              />
            );
          })}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  largeImg: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      // key: PropTypes.number.isRequired,
      // largeImg: PropTypes.string.isRequired,
      // image: PropTypes.string.isRequired,
    }),
  ),
};

export default ImageGallery;
