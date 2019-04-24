import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logoutUser } from '../../actions/authActions'
import image from "../../styles/Logo1.png";
import '../../styles/navbar-logged.scss'
class Navbar extends Component {
    onClick = (e) => {
        e.preventDefault();
        this.props.logoutUser(this.props.history)

    }
    render() {

        const NavbarLogged = (
            <nav>
                <Link className="nav-logo" to="/login">
                    <img src={image} alt="logo" />
                </Link>

                <ul className="Navbar-Logged_menu">
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
                        <Link to="/login" id="kayıt_ol" onClick={this.onClick}>
                            Çıkış Yap
                </Link>
                    </li>
                </ul>
            </nav>
        )
        const Navbar = (
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
        )
        return (
            <>
                {this.props.auth ? NavbarLogged : Navbar}
            </>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar))