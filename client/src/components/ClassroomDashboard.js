import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../instance';
import '../styles/ClassroomDashboard.scss';
import { Button } from 'reactstrap';
import CreatePostModal from './modals/CreatePostModal';

function ClassroomDashboard(props) {
  const [classroomInfo, setClassroomInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const { classroomID } = useParams();

  useEffect(() => {
    instance
      .get(`/api/classroom/getClassroomDetail/${classroomID}`)
      .then(({ data: { classroom } }) => {
        setClassroomInfo(classroom);
      });
    instance.get(`/api/post/getClassPosts/${classroomID}`).then(response => {
      console.log(response);
    });
  }, [classroomID]);
  return (
    <>
      {classroomInfo && (
        <div className="classroomDetail">
          <h3>{classroomInfo.name}</h3>
          <div className="actionButtons">
            <Button>Post Oluştur</Button>
          </div>
          <CreatePostModal  isOpen={true}/>
        </div>
      )}
    </>
  );
}

export default ClassroomDashboard;
