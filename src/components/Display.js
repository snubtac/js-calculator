import React from 'react';

const Display = (props) => {

  return (
  <div>
    <div id="input" className="sixteen wide column">
      {props.question}
    </div>
    <div id="display" className="sixteen wide column">
      {props.answer}
    </div>
  </div>
  );
};

export default Display;
