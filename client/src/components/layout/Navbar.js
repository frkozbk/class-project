import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import JoinClassModal from '../modals/JoinClassModal';

import { logoutUser } from '../../actions/authActions';
import image from '../../styles/Logo1.png';
import '../../styles/navbar-logged.scss';
import CreateClassModal from '../modals/CreateClassModal';
import DefaultNavbar from './DefaultNavbar';
import NavbarTeacher from './NavbarTeacher';
import NavbarStudent from './NavbarStudent';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createClassModalIsOpen: false,
      joinClassModalIsOpen: false
    };
  }

  handleLogout = e => {
    const { logoutUserFn, history } = this.props;
    logoutUserFn(history);
  };

  render() {
    const { joinClassModalIsOpen, createClassModalIsOpen } = this.state;
    const { isAuthenticated, isTeacher } = this.props;
    console.log(isAuthenticated);
    return (
      <>
        {isAuthenticated &&
          (isTeacher ? (
            <NavbarTeacher
              openCreateClassModal={() =>
                this.setState({ createClassModalIsOpen: true })
              }
              image={image}
              handleLogout={() => this.handleLogout()}
            />
          ) : (
            <NavbarStudent
              openJoinClassModal={() =>
                this.setState({ joinClassModalIsOpen: true })
              }
              image={image}
              handleLogout={() => this.handleLogout()}
            />
          ))}
        {!isAuthenticated && <DefaultNavbar image={image} />}
        <JoinClassModal
          isOpen={joinClassModalIsOpen}
          onClose={() => this.setState({ joinClassModalIsOpen: false })}
        />
        <CreateClassModal
          isOpen={createClassModalIsOpen}
          onClose={() => this.setState({ createClassModalIsOpen: false })}
        />
      </>
    );
  }
}
const mapStateToProps = state => ({
  authInfo: state.auth,
  isAuthenticated: state.auth && state.auth.isAuthenticated,
  isTeacher: state.auth && state.auth.user && state.auth.user.isteacher
});
export default connect(mapStateToProps, {
  logoutUserFn: logoutUser
})(withRouter(Navbar));
