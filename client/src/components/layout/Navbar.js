import React, { Component } from 'react'

import JoinClassModal from '../modals/JoinClassModal'

import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logoutUser } from '../../actions/authActions'
import image from "../../styles/Logo1.png";
import '../../styles/navbar-logged.scss'
import { Button } from 'reactstrap';
import CreateClassModal from '../modals/CreateClassModal'
import NavbarTeacher from './NavbarTeacher'
import NavbarStudent from './NavbarStudent'
class Navbar extends Component {
    state= {
        createClassModalIsOpen: false,
        joinClassModalIsOpen: false,
    }
    handleLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser(this.props.history)
    }
    render() {
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
                {
                    this.props.auth 
                    ? 
                        this.props.auth.isteacher === true
                        ? <NavbarTeacher openCreateClassModal={() => this.setState({createClassModalIsOpen:true}) } image={image} handleLogout={() =>this.handleLogout()}/>
                        : <NavbarStudent openJoinClassModal={() => this.setState({joinClassModalIsOpen:true})} image={image} handleLogout={() =>this.handleLogout()}/>
                    : 
                        Navbar
                }
                <JoinClassModal isOpen={this.state.joinClassModalIsOpen} onClose={() => this.setState({joinClassModalIsOpen: false})}/>
                <CreateClassModal isOpen={this.state.createClassModalIsOpen} onClose={() => this.setState({createClassModalIsOpen: false})} />
            </>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar))