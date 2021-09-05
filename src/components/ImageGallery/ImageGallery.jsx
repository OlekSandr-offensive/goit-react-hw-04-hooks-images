import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, largeImg }) {
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

// export class OldImageGallery extends Component {
//   render() {
//     const { images, largeImg } = this.props;

//     return (
//       <>
//         <ul className="ImageGallery">
//           {images.map(image => {
//             return (
//               <ImageGalleryItem
//                 key={image.id}
//                 image={image}
//                 largeImg={() => {
//                   largeImg(image.largeImageURL);
//                 }}
//               />
//             );
//           })}
//         </ul>
//       </>
//     );
//   }
// }

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

// export default ImageGallery;
