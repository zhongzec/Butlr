import React from 'react';
import logo from 'assets/logo.svg';
import ellipsisv from 'assets/ellipsis-v.svg';
import miniLogo from 'assets/mini-logo.svg';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="py-8 px-2">
        <img src={logo} className="logo" alt="butlr." />
      </div>

      <div className="menu">
        <div className="menu__item is-active">
          <span><i className="menu-icon icon-graph" /></span>
        </div>
        <div className="menu__item">
          <span><i className="menu-icon icon-bell" /></span>
        </div>
        <div className="menu__item">
          <span><img src={ellipsisv} alt=""/></span>
        </div>
        <div className="my-4 pl-2">
          <img src={miniLogo} alt="b." />
        </div>
      </div>
    </div>
  );
}

export {
  Navigation
}
