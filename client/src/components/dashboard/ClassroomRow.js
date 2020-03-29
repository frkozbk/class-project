import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { leaveClass } from '../../actions/classActions';
import { getUserClass } from '../../actions/getUserClass';

const ClassroomRow = ({
  name,
  classid,
  teachername,
  getUserClassFn,
  history
}) => {
  const handleLeave = async () => {
    leaveClass(classid).then(() => {
      getUserClassFn();
    });
  };
  const goToClassPAge = () => {
    history.push({});
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{teachername}</td>
      <td>
        <Link
          to={{
            pathname: `/classroom/${classid}`,
            params: {
              name,
              teachername,
              classid
            }
          }}
        >
          <Button onClick={goToClassPAge} color="primary" className="mr-5">
            Sınıf Sayfasına Git
          </Button>
        </Link>

        <Button color="danger" onClick={handleLeave}>
          Bu Sınıftan Ayrıl
        </Button>
      </td>
    </tr>
  );
};
const mapDispatchToProps = dispatch => ({
  leaveClassFn: bindActionCreators(leaveClass, dispatch),
  getUserClassFn: bindActionCreators(getUserClass, dispatch)
});
export default withRouter(connect(null, mapDispatchToProps)(ClassroomRow));
