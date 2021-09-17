import React, { useState, useEffect, useCallback } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Searchbar from '../Searchbar/Searchbar';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery';
import ImageError from '../ImageError';
import Modal from '../Modal';
import imageAPI from '../../services/ImageApi';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [largeImg, setLargeImg] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [currentName, setCurrentName] = useState('');

  const fetchApi = useCallback(() => {
    imageAPI
      .fetchImage(currentName, page)
      .then(result => {
        setImageName('');
        setStatus(Status.RESOLVED);
        setImages(images => [...images, ...result]);
        setPage(page => page + 1);
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
  }, [setStatus, setError, setImages, imageName, page, currentName]);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setStatus(Status.PENDING);
    setCurrentName(imageName);
    if (imageName === currentName) {
      fetchApi(imageName, page);
    }
  }, [imageName, fetchApi, page, currentName]);

  const handleFormSubmit = newImage => {
    if (newImage !== currentName) {
      setImageName(newImage);
      setImages([]);
      setPage(1);
    } else {
      toast.error('This text has already been found!');
    }
  };

  const handlerClickImage = url => {
    return setLargeImg(url);
  };

  const myScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
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
          <Button onClick={fetchApi} />
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
