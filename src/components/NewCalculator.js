import React, { useReducer } from 'react';
import './Calculator.css';
import Display from './Display';
import Buttons from './Buttons';
import { evaluate } from 'mathjs';

const initialState = {
  inputScreen: '',
  answerScreen: '0',
  lastClicked: ''
};

const DELETE = 'DELETE';
const RESET = 'RESET';
const INTEGER = 'INTEGER';
const INTEGER_OPS = 'INTEGER_OPS';
const ZERO = 'ZERO';
const DECIMAL = 'DECIMAL';
const OPERATOR_MINUS = 'OPERATOR_MINUS';
const OPERATOR_DIGIT = 'OPERATOR_DIGIT';
const OPERATOR_DOUBLEMINUS = 'OPERATOR_DOUBLEMINUS';
const OPERATOR = 'OPERATOR';
const CALCULATE = 'CALCULATE';

function reducer(state = initialState, action) {

  switch(action.type) {
    case DELETE:
      return {
        ...state,
        inputScreen: state.inputScreen.slice(0, -1),
        answerScreen: state.answerScreen === '0'
          ? state.answerScreen
          : state.answerScreen.slice(0, -1),
        lastClicked: state.inputScreen.charAt(state.inputScreen.length-2)
      };
    case RESET:
      return initialState;
    case DECIMAL:
      return {
      ...state,
      inputScreen: state.inputScreen === '' || /[x+‑/]/.test(state.lastClicked)
        ? state.inputScreen + "0" + action.payload
        : state.inputScreen + action.payload,
      answerScreen: /[x+‑/]/.test(state.lastClicked)
        ? "0" + action.payload
        : state.answerScreen + action.payload,
      lastClicked: action.payload
      };
    case ZERO:
      return {
        ...state,
        inputScreen: state.answerScreen === '0'
          ? action.payload
          : state.inputScreen + action.payload,
        answerScreen: state.answerScreen === '0'
          ? action.payload
          : /[+x/]/.test(state.lastClicked)
          ? action.payload
          : state.answerScreen + action.payload,
        lastClicked: action.payload
      };

    case OPERATOR_MINUS:
      return {
        ...state,
        inputScreen: state.lastClicked === '='
        ? state.answerScreen + action.payload
        : state.inputScreen + action.payload,
        answerScreen: action.payload,
        lastClicked: action.payload
      };

    case OPERATOR: //(+x/)
      return {
        ...state,
        inputScreen: state.lastClicked === '='
        ? state.answerScreen + action.payload
        : state.inputScreen.slice(0, -1) + action.payload,
        answerScreen: action.payload,
        lastClicked: action.payload
      };

    case OPERATOR_DOUBLEMINUS:
      return {
        ...state,
        inputScreen: /[+-x/]/.test(state.inputScreen.charAt(state.inputScreen.length-2))
        ? state.inputScreen.slice(0, -2) + action.payload
        : state.lastClicked === '='
        ? state.answerScreen + state.payload
        : state.inputScreen.slice(0, -1) + action.payload,
        answerScreen: action.payload,
        lastClicked: action.payload
      };

    case OPERATOR_DIGIT: //0-9
      return {
        ...state,
        inputScreen: state.lastClicked === '='
        ? state.answerScreen + action.payload
        : state.inputScreen + action.payload,
        answerScreen: action.payload,
        lastClicked: action.payload
      };

    case CALCULATE:
      let lastChar = state.inputScreen.charAt(state.inputScreen.length-1);
      let question = /[x+-/.]/.test(lastChar)
      ? state.inputScreen.slice(0,-1)
      : state.inputScreen;
      let formula = question.replace(/x/g, '*');
      let answer = Number(evaluate(formula).toFixed(10));

      return {
        ...state,
        inputScreen: question + action.payload + answer,
        answerScreen: answer,
        lastClicked: action.payload
      };
    case INTEGER:
      return {
        inputScreen: state.answerScreen === '0'
          ? action.payload
          : state.inputScreen + action.payload,
        answerScreen: state.answerScreen === '0'
          ? action.payload
          : state.answerScreen + action.payload,
        lastClicked: action.payload,
      };
    case INTEGER_OPS:
      return {
        inputScreen: state.answerScreen === '0'
          ? action.payload
          : state.inputScreen + action.payload,
        answerScreen: state.answerScreen === '0'
          ? action.payload
          : state.answerScreen + action.payload,
        lastClicked: action.payload,
      };
    default: return state;
  }
};


const NewCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (event) => {

    const value = event.target.value;

    if(state.answerScreen.length > 11) {
      if(value === 'DEL') {
        if(state.lastClicked !== "=") {
        dispatch ({ type: DELETE, payload: value })
        };
      }
      else if (value === 'AC') {
        dispatch ({ type: RESET });
      }
    }
    else {
      switch(value) {
        case 'DEL':
          if(state.lastClicked !== "=") {
          dispatch ({ type: DELETE, payload: value })
          }
        break;
        case 'AC':
          dispatch ({ type: RESET })
        break;
        case '.':
          if(!/\./.test(state.answerScreen) && state.lastClicked !== '='){
          dispatch ({ type: DECIMAL, payload: value })
        }break;
        case '0':
          if(state.answerScreen !== '0'
            && state.inputScreen !=='0'
            && state.lastClicked !== '=') {
          dispatch ({ type: ZERO, payload: value })
          }
        break;
        case '-':
          if(state.lastClicked !== '-' && state.lastClicked !== '.'){
            dispatch ({ type: OPERATOR_MINUS, payload: value })
          }
        break;
        case '+':
        case 'x':
        case '/':
          if(state.lastClicked !== '.' && state.inputScreen !== '') {
            if(/[x+/]$/.test(state.inputScreen)) {
              dispatch ({ type: OPERATOR, payload: value })
            } else if(/-$/.test(state.inputScreen)){
              dispatch ({ type: OPERATOR_DOUBLEMINUS, payload: value })
            } else {
              dispatch ({ type: OPERATOR_DIGIT, payload: value })
            }
          }
        break;
        case '=':
          dispatch ({ type: CALCULATE, payload: value })
        break;
        default:
          if(state.lastClicked !== "=") {
            if(/[+-x/]/.test(state.lastClicked)){
              dispatch ({ type: INTEGER_OPS, payload: value })
            } else {
            dispatch ({ type: INTEGER, payload: value })
            }
          }
      };
    }
  };

  return (
  <div id="main-body">
    <div id="cal-body" >
      <Display
        question={state.inputScreen}
        answer={state.answerScreen}
      />
      <Buttons handleClick={handleClick}/>
    </div>
  </div>
  );
};

export default NewCalculator;
