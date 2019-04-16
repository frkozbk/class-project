import React, { Component } from "react";
import "./Auth.css";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isteacher: false,
      name: "",
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/homepage");
    // }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      isteacher: this.state.isteacher
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <section className="login-section">
        <div className="top">
          <div className="bottom">
            <div className="corner-1" />
            <div className="corner-2" />
            <div className="corner-3" />
            <div className="corner-4" />
            <form noValidate onSubmit={this.onSubmit} className="register-form">
              <h2>Kayıt Ol</h2>
              <TextFieldGroup
                placeholder="İsim"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                placeholder="Email"
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
              <TextFieldGroup
                placeholder="Şifre Tekrar"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
              />
              <div className="ui toggle checkbox">
                <label>Öğretmen misiniz?</label>
                <input
                  id="isTeacher"
                  type="checkbox"
                  onClick={() =>
                    this.setState({ isteacher: !this.state.isteacher })
                  }
                />
              </div>

              <button type="submit" class="login-button">
                Kayıt Ol
              </button>
              <p class="message">
                Zaten Kayıtlı Mısınız? <Link to="/">Giriş Yapın </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
registerUser.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
