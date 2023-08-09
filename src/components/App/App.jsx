import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { nanoid } from 'nanoid';
import { fetchGallery } from '../../services/getImages';
import css from '../App/App.module.css';
import Seachbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

export class App extends Component {
  state = {
    searchText: '',
    galleryItems: [],
    galleryPage: 1,
    currentQuantity: 0,

    loading: false,
    isButtonShow: false,
    error: true,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchText;
    const nextQuery = this.state.searchText;
    const prevPage = prevState.galleryPage;
    const nextPage = this.state.galleryPage;

    if (prevQuery !== nextQuery) {
      this.setState({ galleryItems: [], galleryPage: 1, isButtonShow: false });

      if (nextPage === 1) {
        this.fetchGalleryItems(nextQuery, nextPage);
      }
    } else if (prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage);
    }
  }

  fetchGalleryItems = (query, page) => {
    fetchGallery(query, page)
      .then(response => {
        const {
          data: { hits, totalHits },
        } = response;

        const newData = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
          // id: nanoid(),
          id,
          tags,
          webformatURL,
          largeImageURL,
        }));

        this.setState(prevState => {
          prevState.currentQuantity += newData.length;
        });

        this.setState({ galleryItems: hits });

        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...newData],
        }));
        if (!totalHits) {
          this.setState({ loading: false, error: true });
          return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (this.state.currentQuantity >= totalHits) {
          this.setState({
            loading: false,
            isButtonShow: false,
            error: false,
          });
          return;
        }

        if (page === 1) {
          Notify.success(`Hooray! We found ${totalHits} images.`);
        }

        this.setState({
          loading: false,
          isButtonShow: true,
          error: false,
        });
      })
      .catch(error => console.log(error));
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
    const { galleryItems, isButtonShow, loading, error } = this.state;
    return (
      <div className={css.app}>
        <Seachbar handleSearch={this.handleSearch} />

        {!error && <ImageGallery galleryItems={galleryItems} />}
        {loading && <Loader />}
        {isButtonShow && <Button handleClick={this.onLoadMore} />}
      </div>
    );
  }
}
