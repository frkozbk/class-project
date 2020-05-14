import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import Chat from './Chat/Chat';
import Post from './Post';
import instance from '../instance';
import '../styles/ClassroomDashboard.scss';
import CreatePostModal from './modals/CreatePostModal';

function ClassroomDashboard(props) {
  const [classroomInfo, setClassroomInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isCreatePostModalIsOpen, setIsCreatePostModalIsOpen] = useState(false);
  const { classroomID } = useParams();

  useEffect(() => {
    instance
      .get(`/api/classroom/getClassroomDetail/${classroomID}`)
      .then(({ data: { classroom } }) => {
        setClassroomInfo(classroom);
      });
    !isCreatePostModalIsOpen && getPosts();
  }, [classroomID, isCreatePostModalIsOpen]);
  const getPosts = () => {
    instance.get(`/api/post/getClassPosts/${classroomID}`).then(({ data }) => {
      setPosts(data.posts);
    });
  };
  return (
    <>
      {classroomInfo && (
        <div className="classroomDetail">
          <h3>{classroomInfo.name}</h3>
          <div className="actionButtons">
            <Button onClick={() => setIsCreatePostModalIsOpen(true)}>
              Post Oluştur
            </Button>
          </div>
          <CreatePostModal
            isOpen={isCreatePostModalIsOpen}
            handleClose={() => setIsCreatePostModalIsOpen(false)}
            classroomId={classroomID}
            title="Post Oluştur"
          />
        </div>
      )}
      {posts.length > 0 &&
        posts.map(post => (
          <Post
            post={post}
            id={post._id}
            key={post._id}
            imgSrc={post.author.avatar}
            username={post.author.name}
            date={post.date}
            content={post.content}
            comments={post.comments}
            getPosts={getPosts}
          />
        ))}
      <Chat />
    </>
  );
}

export default ClassroomDashboard;
