import React from 'react';
import MathJax from 'react-mathjax-preview';

const MathJaxPreview = ({ value, isHidden }) => {
  return (
    <div
      style={{
        paddingLeft: '18px',
        paddingRight: '18px',
        display: `${isHidden ? 'none' : 'block'}`
      }}
    >
      <MathJax math={value} />
    </div>
  );
};

export default MathJaxPreview;
