import React from 'react';
import MathJaxPreview from './common/MathJaxPreview';

const Comment = ({ author, avatar, date, content }) => {
  return (
    <div className="comment">
      <img src={avatar} alt="profil fotoğrafı" />
      <div className="comment-content">
        <p>{author}</p>
        <MathJaxPreview value={content} />
      </div>
    </div>
  );
};

export default Comment;
