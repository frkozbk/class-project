import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import { connect } from "react-redux";
import { getUserClass } from "../../actions/getUserClass";

class Homepage extends Component {
  componentDidMount() {
    this.props.getUserClass()

  }
  render() {

    return (
      <><Navbar />
      </>
    )


  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});
export default connect(
  mapStateToProps,
  { getUserClass }
)(Homepage);
