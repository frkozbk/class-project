import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/loginform.scss";
import classnames from 'classnames'
import { registerUser } from '../../actions/authActions'
class Register extends Component {
    constructor() {
        super();
        this.state = {
            isteacher: false,
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    // Kullanıcı login durumunda ise /register sayfasına giremez
    // /classroom sayfasına 

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/classroom");
        }
    }
    // Register formunda bir hata varsa error state ine yaz.
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            isteacher: this.state.isteacher
        };

        this.props.registerUser(newUser, this.props.history);
    }
    render() {
        const { errors } = this.props
        return (
            <>
                <section className="loginForm_section">
                    <form noValidate onSubmit={this.onSubmit}>
                        <h1>Kayıt Ol</h1>
                        <input name="name" value={this.state.name} onChange={this.onChange} type="text" placeholder="Kullanıcı Adı" className={classnames('', { 'is-invalid': errors.name })} />
                        {errors.name ? (<small className="small-info">{errors.name}</small>) : <></>}
                        <input name="email" value={this.state.email} onChange={this.onChange} type="email" placeholder="E-mail" className={classnames('', { 'is-invalid': errors.email })} />
                        {errors.email ? (<small className="small-info">{errors.email}</small>) : <></>}
                        <input name="password" value={this.state.password} onChange={this.onChange} type="password" placeholder="Şifreyi giriniz" className={classnames('', { 'is-invalid': errors.password })} />
                        {errors.password ? (<small className="small-info">{errors.password}</small>) : <></>}
                        <input type="password" value={this.state.password2} onChange={this.onChange} placeholder="Şifreyi tekrar giriniz" name="password2" className={classnames('', { 'is-invalid': errors.password2 })} />
                        {errors.password2 ? (<small className="small-info">{errors.password2}</small>) : <></>}
                        <div className="isTeacher">
                            <label>Öğretmen misiniz?</label>
                            <input
                                id="isTeacher"
                                type="checkbox"
                                onClick={() =>
                                    this.setState({ isteacher: !this.state.isteacher })
                                }
                            />
                        </div>

                        <button>KAYIT OL</button>
                        <div class="info">
                            <p>
                                Kayıtlı mısınız?<Link to="/Login"> Giriş Yap</Link>
                            </p>
                        </div>
                    </form>
                </section>
            </>
        )
    }
}
Register.propTypes = {
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