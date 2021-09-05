import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Searchbar from '../Searchbar/Searchbar';
import ApiService from '../ApiService';

export default function App() {
  const [imageName, setImageName] = useState([]);

  return (
    <div className="App">
      <Searchbar onSubmit={setImageName} />
      <ApiService imageName={imageName} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
