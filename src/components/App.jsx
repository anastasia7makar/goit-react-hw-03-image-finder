import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchGallery } from '../services/getImages';
import css from '../components/App.module.css';
import Seachbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const initialState = {
  searchText: '',
  galleryItems: [],
  galleryPage: 1,
  currentQuantity: 0,
  loading: false,
  isButtonShow: false,
};

export class App extends Component {
  state = initialState;

  componentDidUpdate(_, prevState) {
    const query = prevState.searchText !== this.state.searchText;
    const page =
      prevState.galleryPage !== this.state.galleryPage &&
      this.state.galleryPage !== 1;

    if (query || page) {
      this.fetchGalleryItems(
        this.state.searchText,
        page ? this.state.galleryPage : initialState.galleryPage,
        query
      );
    }
  }

  fetchGalleryItems = (query, page, isClearHits = false) => {
    if (isClearHits)
      this.setState({
        galleryItems: [],
        currentQuantity: initialState.currentQuantity,
        galleryPage: initialState.galleryPage,
      });

    this.setState({ loading: true, isButtonShow: false });

    fetchGallery(query, page)
      .then(response => {
        const {
          data: { hits, totalHits },
        } = response;

        if (!totalHits)
          return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );

        if (page === initialState.galleryPage) {
          Notify.success(`Hooray! We found ${totalHits} images.`);
        }

        this.setState(prevState => {
          const currentQuantity = (prevState.currentQuantity += hits.length);

          return {
            loading: false,
            isButtonShow: currentQuantity < totalHits,
            currentQuantity,
            galleryItems: [...prevState.galleryItems, ...hits],
          };
        });
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleSearch = searchText => {
    this.setState({ searchText });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  render() {
    const { galleryItems, isButtonShow, loading } = this.state;

    return (
      <div className={css.app}>
        <Seachbar handleSearch={this.handleSearch} />
        <ImageGallery galleryItems={galleryItems} />
        {loading && <Loader />}
        {isButtonShow && <Button handleClick={this.onLoadMore} />}
      </div>
    );
  }
}
