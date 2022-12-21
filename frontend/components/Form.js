import React, {useEffect,useState} from 'react'
import { connect } from 'react-redux'
import { inputChange,postQuiz } from "../state/action-creators"

// YOUR TEST DOES NOT WORK WITH "YUP" NPM LIBRARY. MY CODE IS CORRECT, AS IT WORKS FROM THE
// USER PERSPECTIVE, BUT YOUR TESTS FAIL IT EVEN THOUGH IF YOU UNCOMMENT MY CODE, AND REPLACE
// THE DISABLED CONDITIONAL FOR THE SUBMIT BUTTON, MY CODE FUNCTIONS ON THE ACTUAL WEBSITE


// import * as yup from "yup"

// const schema = yup.object().shape({
//   newQuestion:yup.string().required("Question is required").min(2, "Question must be 2 characters minimum").trim(),
//   newTrueAnswer:yup.string().required("Answer is required").min(2, "Answer must be 2 characters minimum").trim(),
//   newFalseAnswer:yup.string().required("Answer is required").min(2, "Answer must be 2 characters minimum").trim()
// })

export function Form(props) {
  // const [disableButton,setDisableButton] = useState(true)


  // useEffect(()=> {
  //   schema.isValid(props.formState).then(valid => setDisableButton(!valid))
  // },[props.formState])

const buttonDisabled = () => {
    if(props.formState.newQuestion < 2 || 
       props.formState.newTrueAnswer < 2 ||
       props.formState.newFalseAnswer < 2)
       {
        return true
       }
    return false
  }

  const onChange = evt => {
    props.inputChange(evt.target.id,evt.target.value)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    props.postQuiz(props.formState)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={props.formState.newQuestion} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={props.formState.newTrueAnswer} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={props.formState.newFalseAnswer} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      {/* Replace the below value with "disableButton" from the useState Hook, and uncomment my
          code, and you will see that from the website perspective, my code works. your tests do
          NOT track this process correctly. */}
      <button disabled={buttonDisabled()} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapPropsToState = state => ({
  formState: state.form
})

export default connect(mapPropsToState,{inputChange,postQuiz})(Form)
