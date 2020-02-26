import React, { Component } from "react";
import "../../styles/class.scss";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { getUserClass } from "../../actions/getUserClass";
class Classroom extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.getUserClass()

    }
    componentWillReceiveProps(nextProps) {
        this.setState({ user_class: nextProps.user_class.classes })
    }

    render() {
        let content;
        if (this.state.user_class) {
            content = this.state.user_class.map(iter => {
                return (
                    <li>
                        <div className="class_card-header">
                            <h1>
                                <Link to={`/classroom/${iter.classid}`} >{iter.name}</Link>
                            </h1>
                        </div>
                        <img
                            src={iter.avatar}
                            alt="teachername"
                        />

                        <div className="class_card-footer">
                            <h3>{iter.teachername}</h3>
                        </div>
                    </li>
                )
            })
        }
        return (
            <section className="class_section">
                <ul>
                    {content}
                </ul>
            </section>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user,
    user_class: state.user_class
});
export default connect(
    mapStateToProps,
    { getUserClass }
)(Classroom);
