import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { loginUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import classnames from 'classnames'
import "../../styles/loginform.scss";
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errors: {}
        }

    }
    // Kullanıcı giriş yapmışsa login sayfasına giremez o yüzden 
    // ana sayfa olan /classroom sayfasına yönlendir
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/classroom");
        }
    }
    componentWillReceiveProps = nextProps => {

        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/classroom");
        }
        //Login formunda bir hata varsa bunu state'e koy
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    };
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        console.log("submit")
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(user);
    };
    render() {
        const { errors } = this.props;
        return (
            <section className="loginForm_section">
                <form onSubmit={this.onSubmit}>
                    <h1>Giriş Yap</h1>
                    <input type="email" placeholder="E-mail" name="email" value={this.state.name} onChange={this.onChange} className={classnames('', { 'is-invalid': errors.email })} />
                    {errors.email ? (<small className="small-info">{errors.email}</small>) : <></>}
                    <input type="password" placeholder="E-mail" name="password" value={this.state.name} onChange={this.onChange} className={classnames('', { 'is-invalid': errors.password })} />
                    {errors.password ? (<small className="small-info">{errors.password}</small>) : <></>}
                    <button>GİRİŞ YAP</button>
                    <div className="info">
                        <p>
                            Kayıtlı değil misiniz?<Link to="/register"> Kayıt Olun.</Link>
                        </p>
                    </div>
                </form>
            </section >
        )
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