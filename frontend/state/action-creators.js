// ❗ You don't need to add extra action creators to achieve MVP

import axios from "axios"
import { 
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_TO_LOADING,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM} from "./action-types"

export function moveClockwise() {
  return {type: MOVE_CLOCKWISE}
}

export function moveCounterClockwise() {
  return {type: MOVE_COUNTERCLOCKWISE}
}

export function selectAnswer(selectedID) {
  return {type: SET_SELECTED_ANSWER,payload:selectedID}
}

export function setMessage(message) {
  return {type:SET_INFO_MESSAGE,payload:message}
}

export function setQuiz() { }

export function inputChange(inputId,inputValue) {
  return {type:INPUT_CHANGE,payload:{inputId,inputValue}}
}

export function resetForm() {
  return {type: RESET_FORM}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch({type:SET_QUIZ_TO_LOADING})
    axios.get("http://localhost:9000/api/quiz/next")
    .then(res => dispatch({type:SET_QUIZ_INTO_STATE,payload:res.data}))
  }
}
export function postAnswer(quizId,answerId) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post("http://localhost:9000/api/quiz/answer",{quiz_id:quizId,answer_id:answerId})
    .then(res => {
      dispatch(setMessage(res.data.message))
      dispatch(selectAnswer(null))
      dispatch({type:SET_QUIZ_TO_LOADING})
      axios.get("http://localhost:9000/api/quiz/next")
      .then(res => dispatch({type:SET_QUIZ_INTO_STATE,payload:res.data}))
    })
    
  }
}
export function postQuiz(formData) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post("http://localhost:9000/api/quiz/new",{
      question_text:formData.newQuestion,
      true_answer_text:formData.newTrueAnswer,
      false_answer_text:formData.newFalseAnswer})
      .then(res => {
        console.log(res.data)
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
        dispatch(resetForm())
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
