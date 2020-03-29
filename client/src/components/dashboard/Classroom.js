import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import '../../styles/class.scss';
import { getUserClass } from '../../actions/getUserClass';
import ClassroomRow from './ClassroomRow';

class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getUserClassFn } = this.props;
    getUserClassFn();
  }

  render() {
    const { classes } = this.props;
    const classroomRows =
      Array.isArray(classes) &&
      classes.map(userClass => <ClassroomRow {...userClass} />);
    return (
      <section className="class_section">
        {/* <ul>{content}</ul> */}
        <Table>
          <thead>
            <tr>
              <th>Sınıf ismi</th>
              <th>Öğretmen ismi</th>
              <th>Aksiyonlar</th>
            </tr>
          </thead>
          <tbody>{classroomRows}</tbody>
        </Table>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  classes: state.user_class.classes
});
const mapDispatchToProps = dispatch => ({
  getUserClassFn: bindActionCreators(getUserClass, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
