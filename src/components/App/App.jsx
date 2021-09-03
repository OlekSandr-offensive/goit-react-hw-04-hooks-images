import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Searchbar from '../Searchbar/Searchbar';
import ApiService from '../ApiService';

export class App extends Component {
  state = {
    imageName: [],
  };

  handleSearchFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ApiService imageName={this.state.imageName} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
