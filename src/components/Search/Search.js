import React from 'react';
import './Search.css';

const Search = () => {
  return (
    <div className="Search">
      <i className="icon-search" />
      <input
        type="text"
        className="Search__input"
        placeholder="Search Reports and Help"
      />
    </div>
  );
}

export {
  Search
}