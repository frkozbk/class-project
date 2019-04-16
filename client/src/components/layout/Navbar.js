import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./Navbar.css";
import { Link } from "react-router-dom";
class Navbar extends Component {
  onClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };
  render() {
    return (
      <nav className="main-menu">
        <ul>
          <li>
            <Link to="/homepage">
              <i className="fa fa-home fa-2x" />
              <span className="nav-text">Sınıflar</span>
            </Link>
          </li>

          <li>
            <Link to="/">
              <i className="fa fa-font fa-2x" />
              <span className="nav-text">Mesajlar</span>
            </Link>
          </li>
        </ul>

        <ul className="logout">
          <li onClick={this.onClick}>
            <Link to="/">
              <i className="fa fa-power-off fa-2x" />
              <span className="nav-text">Çıkış Yap</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
