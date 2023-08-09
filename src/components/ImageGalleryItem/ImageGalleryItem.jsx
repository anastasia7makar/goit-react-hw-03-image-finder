import Modal from 'components/Modal/Modal';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import { Component } from 'react';
class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isShowModal } = this.state;
    return (
      <li className={css.galleryItem} onClick={this.toggleModal}>
        <img src={webformatURL} alt={tags} className={css.galleryImg} />
        {isShowModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            toggleModal={this.toggleModal}
          />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
