import React from 'react';
import { Link } from 'react-router-dom';

const DefaultNavbar = ({ image }) => {
  return (
    <nav>
      <Link className="nav-logo" to="/login">
        <img src={image} alt="logo" />
      </Link>

      <ul>
        <li>
          <Link to="/login">Giriş Yap</Link>
        </li>
        <li id="lastitem">
          <Link to="/register" id="kayıt_ol">
            KAYIT OL
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DefaultNavbar;
