import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserClass } from '../../actions/getUserClass';

const NavbarStudent = ({
  image,
  openJoinClassModal,
  handleLogout,
  getUserClassFn
}) => {
  return (
    <nav>
      <Link className="nav-logo" to="/login">
        <img src={image} alt="logo" />
      </Link>

      <ul className="Navbar-Logged_menu">
        <li>
          <Button onClick={() => openJoinClassModal()} color="info">
            Sınıfa Katıl
          </Button>
        </li>
        <li>
          <Link to="/classroom">Sınıflar</Link>
        </li>
        <li>
          <Link to="/tasks">Ödevler</Link>
        </li>
        <li>
          <Link to="/messages">Mesajlar</Link>
        </li>
        <li id="lastitem">
          <Button type="info" onClick={() => handleLogout()}>
            Çıkış Yap
          </Button>
        </li>
      </ul>
    </nav>
  );
};

const mapDispatchToProps = dispatch => ({
  getUserClassFn: bindActionCreators(getUserClass, dispatch)
});
export default connect(null, mapDispatchToProps)(NavbarStudent);
