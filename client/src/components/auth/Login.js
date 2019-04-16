import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import "./Auth.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/homepage");
  //   }
  // }
  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/homepage");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  };
  render() {
    const { errors } = this.state;
    return (
      <section className="login-section">
        <div className="top">
          <div className="bottom">
            <form onSubmit={this.onSubmit} className="register-form">
              <h2>GİRİŞ YAP</h2>
              <TextFieldGroup
                placeholder="E-posta"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                placeholder="Şifre"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />

              <button type="submit" className="login-button">
                Giriş Yap
              </button>
              <p className="message">
                Kayıtlı değil misiniz? <Link to="/register">Kayıt olun</Link>
              </p>
            </form>
            <div className="footer" />
          </div>
        </div>
      </section>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
