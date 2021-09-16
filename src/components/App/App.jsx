import React, { useState, useEffect, useCallback } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Searchbar from '../Searchbar/Searchbar';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery';
import ImageError from '../ImageError';
import Modal from '../Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const API_KEY = '21988624-a694c57feb3b9caad270c2fa0';
const BASE_URL = 'https://pixabay.com/api';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [largeImg, setLargeImg] = useState(null);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);

  const fetchImage = useCallback(() => {
    fetch(
      `${BASE_URL}/?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(response => {
        if (response.ok) {
          return response.json().then(data => data.hits);
        }
      })
      .then(result => {
        setStatus(Status.RESOLVED);
        if (page === 1) {
          setImages([...result]);
        } else {
          setImages(prevImages => setImages([...prevImages, ...result]));
        }

        if (!result.length) {
          setError(`  No picture with name :  ${imageName}`);
          setStatus(Status.REJECTED);
        } else {
          setError(null);
        }
      })
      .catch(error => {
        setError(` No picture with name :  ${imageName}`);
        setStatus(Status.REJECTED);
      })
      .finally(() => {
        myScroll();
      });
  }, [setStatus, setError, setImages, imageName, page]);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    console.log(imageName);
    setStatus(Status.PENDING);
    fetchImage();
  }, [imageName, fetchImage]);

  const handlerClickImage = url => {
    return setLargeImg(url);
  };

  const myScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const loadMoreHandler = () => setPage(page + 1);

  const handleSearchImages = namePicture => {
    setImageName(namePicture);
    setPage(1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchImages} />
      <ToastContainer autoClose={3000} />

      {status === Status.IDLE ? <div>Enter a name for the picture</div> : null}

      {status === Status.PENDING ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      ) : null}

      {status === Status.REJECTED ? <ImageError message={error} /> : null}

      {status === Status.RESOLVED ? (
        <>
          <ImageGallery images={images} largeImg={handlerClickImage} />
          <Button onClick={loadMoreHandler} />
        </>
      ) : null}
      {largeImg && (
        <Modal
          onClose={() => {
            setLargeImg(null);
          }}
        >
          <img src={largeImg} alt="" />
        </Modal>
      )}
    </div>
  );
}
