import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css';

const ImageGallery = ({ galleryItems = [] }) => (
  <ul className={css.gallery}>
    {galleryItems.map(galleryItem => {
      return <ImageGalleryItem key={galleryItem.id} {...galleryItem} />;
    })}
  </ul>
);

ImageGallery.propTypes = {
  galleryItems: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default ImageGallery;
