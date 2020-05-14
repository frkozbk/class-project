import React from 'react';
import 'styles/posts.scss';
import { Button } from 'reactstrap';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import relativeTime from 'dayjs/plugin/relativeTime';
import MathJaxPreview from './common/MathJaxPreview';
import Comment from './Comment';
import CreateCommentModal from './modals/CreateCommentModal';

dayjs.locale('tr');
dayjs.extend(relativeTime);
const Post = ({ id, imgSrc, username, date, content, comments, getPosts }) => {
  const [
    isCreateCommentModalOpen,
    setIsCreateCommentModalIsOpen
  ] = React.useState(false);
  const [showComment, setShowComment] = React.useState(false);
  React.useEffect(() => {
    if (isCreateCommentModalOpen === false) {
      getPosts();
    }
  }, [isCreateCommentModalOpen]);
  return (
    <>
      <div className="post">
        <div className="header">
          <div className="personal-info">
            <img src={'https:' + imgSrc} alt="kullanıcı resmi" />
            <p className="username">{username}</p>
          </div>
          <p>{dayjs(date).fromNow()}</p>
        </div>
        <div className="content">
          <MathJaxPreview value={content} />
        </div>
        <div className="post-footer">
          <Button color="link" onClick={() => setShowComment(!showComment)}>
            {comments.length} yorum
          </Button>
          <Button
            color="primary"
            onClick={() => setIsCreateCommentModalIsOpen(true)}
          >
            Yorum yap
          </Button>
        </div>
        {showComment &&
          comments.length > 0 &&
          comments.map((comment, index) => (
            <Comment
              key={comment._id}
              author={comment.author.name}
              avatar={comment.author.avatar}
              content={comment.content}
              date={comment.date}
            />
          ))}
      </div>
      <CreateCommentModal
        title="Yorum Yap"
        isOpen={isCreateCommentModalOpen}
        postId={id}
        handleClose={() => setIsCreateCommentModalIsOpen(false)}
      />
    </>
  );
};

export default Post;
