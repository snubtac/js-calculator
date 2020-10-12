import React from 'react';
import './Calculator.css';

const Buttons = (props) => {

  return (
    <div id="keypad" className="ui inverted segment center aligned grid">
      <div className="four wide column">
        <button
          id="clear"
          className="ui red button"
          value="AC"
          onClick = {props.handleClick}
          >AC
        </button>
        <button
          id="seven"
          className="ui inverted standard button"
          value="7"
          onClick = {props.handleClick}
        >7
        </button>
        <button
          id="four"
          className="ui inverted standard button"
          value="4"
          onClick = {props.handleClick}
        >4
        </button>
        <button
          id="one"
          className="ui inverted standard button"
          value="1"
          onClick = {props.handleClick}
        >1
        </button>
        <button
          id="zero"
          className="ui inverted standard button"
          value="0"
          onClick = {props.handleClick}
        >0
        </button>
      </div>


    <div className="four wide column">
      <button
        id="divide"
        className="ui inverted primary button"
        value="/"
        onClick = {props.handleClick}
      >/
      </button>
      <button
        id="eight"
        className="ui inverted standard button"
        value="8"
        onClick = {props.handleClick}
      >8
      </button>
      <button
        id="five"
        className="ui inverted standard button"
        value="5"
        onClick = {props.handleClick}
      >5
      </button>
      <button
        id="two"
        className="ui inverted standard button"
        value="2"
        onClick = {props.handleClick}
      >2
      </button>
      <button
        id="decimal"
        className="ui inverted standard button"
        value="."
        onClick = {props.handleClick}
      >.
      </button>
    </div>


    <div className="four wide column">
      <button
        id="multiply"
        className="ui inverted primary button"
        value="x"
        onClick = {props.handleClick}
      >x
      </button>
      <button
        id="nine"
        className="ui inverted standard button"
        value="9"
        onClick = {props.handleClick}
      >9
      </button>
      <button
        id="six"
        className="ui inverted standard button"
        value="6"
        onClick = {props.handleClick}
      >6
      </button>
      <button
        id="three"
        className="ui inverted standard button"
        value="3"
        onClick = {props.handleClick}
      >3
      </button>
      <button
        id="delete"
        className="ui inverted red button"
        value="DEL"
        onClick = {props.handleClick}
      >DEL
      </button>
    </div>

    <div className="four wide column">
      <button
        id="subtract"
        className="ui inverted primary button"
        value="-"
        onClick = {props.handleClick}
      >-
      </button>
      <button
        id="add"
        className="ui inverted primary button"
        value="+"
        onClick = {props.handleClick}
      >+
      </button>
      <button
        id="equals"
        className="ui inverted primary button"
        value="="
        onClick = {props.handleClick}
      >=
      </button>
    </div>
  </div>

  );
};

export default Buttons;
