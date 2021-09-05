import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event =>
    setImageName(event.currentTarget.value.toLowerCase());

  const handleSabmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      toast.error('Enter a name for the picture!');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSabmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="imageName"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
