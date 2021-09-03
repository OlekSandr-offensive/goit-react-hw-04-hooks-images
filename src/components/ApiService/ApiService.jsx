import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery';
import ImageError from '../ImageError';
import Modal from '../Modal';

const API_KEY = '21988624-a694c57feb3b9caad270c2fa0';
const BASE_URL = 'https://pixabay.com/api';

export class ApiService extends Component {
  state = {
    images: [],
    error: null,
    largeImg: null,
    page: 1,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    if (prevName !== nextName) {
      this.setState({ status: 'pending', images: [], page: 1 });
      this.fetchImage();
    }
  }

  handlerClickImage = url => {
    return this.setState({ largeImg: url });
  };

  fetchImage = () => {
    const { imageName } = this.props;
    const { page } = this.state;
    fetch(
      `${BASE_URL}/?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(response => {
        if (response.ok) {
          return response.json().then(data => data.hits);
        }
        return Promise.reject(new Error(`No picture with name ${imageName}`));
      })
      .then(result => {
        this.setState(prevState => ({
          images: [...prevState.images, ...result],
          page: prevState.page + 1,
          status: 'resolved',
        }));

        if (!result.length) {
          return Promise.reject(
            new Error(` No picture with name  ${imageName}`),
          );
        } else {
          this.setState({ error: null });
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => this.myScroll());
  };
  myScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div>Enter a name for the picture</div>;
    }
    if (status === 'pending') {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      );
    }
    if (status === 'rejected') {
      return <ImageError message={error.message} />;
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGallery images={images} largeImg={this.handlerClickImage} />
          <Button onClick={this.fetchImage} />
          {this.state.largeImg && (
            <Modal
              onClose={() => {
                this.setState({ largeImg: null });
              }}
            >
              <img src={this.state.largeImg} alt="" />
            </Modal>
          )}
        </>
      );
    }
  }
}

export default ApiService;
