import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchQuiz,selectAnswer,postAnswer } from "../state/action-creators"

export function Quiz(props) {

if(!props.quizState)
  {useEffect(() =>{
    props.fetchQuiz()
  },[])
}

  const answerSelectHandler = (e) => {
    props.selectAnswer(e.target.id)
  }

  const submitAnswerHandler = () => {
    props.postAnswer(props.quizState.quiz_id,props.selectedAnswerState === "question_1" ? props.quizState.answers[0].answer_id : props.quizState.answers[1].answer_id)
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quizState ? (
          <>
            <h2>{props.quizState.question}</h2>

            <div id="quizAnswers">
              <div className={props.selectedAnswerState === "question_1" ? "answer selected": "answer"}>
                {props.quizState.answers[0].text}
                <button id={"question_1"} onClick={answerSelectHandler}>
                  {props.selectedAnswerState === "question_1" ? "SELECTED" : "select"}
                </button>
              </div>

              <div className={props.selectedAnswerState === "question_2" ? "answer selected": "answer"}>
              {props.quizState.answers[1].text}
                <button id={"question_2"} onClick={answerSelectHandler}>
                  {props.selectedAnswerState === "question_2" ? "SELECTED" : "select"}
                </button>
              </div>
            </div>

              {/* submitAnswersBtn must send an object: {quiz_id:data,answer_id:data} */}
            <button onClick={submitAnswerHandler} id="submitAnswerBtn" disabled={!props.selectedAnswerState}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => ({
  quizState : state.quiz,
  selectedAnswerState: state.selectedAnswer
})


export default connect(mapStateToProps,{fetchQuiz,selectAnswer,postAnswer})(Quiz)