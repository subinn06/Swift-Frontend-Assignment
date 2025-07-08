import React from 'react';
import './index.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <span className="logo-square">S</span>
        <span className="logo-text">WIFT</span>
      </div>
      <div className="user-info">
        <div className="user-circle">LG</div>
        <span>Leanne Graham</span>
      </div>
    </header>
  );
}

export default Header;
