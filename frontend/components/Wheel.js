import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise,moveCounterClockwise } from "../state/action-creators"

export function Wheel(props) {

  const movementButtonHandler = (e) => {
    if(e.target.id === "counterClockwiseBtn"){
      props.moveCounterClockwise()
    }
    if(e.target.id === "clockwiseBtn"){
      props.moveClockwise()
    }
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={props.wheelState === 0 ? `cog active` : `cog`} style={{ "--i": 0 }}>{props.wheelState === 0 ? "B" : null}</div>
        <div className={props.wheelState === 1 ? `cog active` : `cog`} style={{ "--i": 1 }}>{props.wheelState === 1 ? "B" : null}</div>
        <div className={props.wheelState === 2 ? `cog active` : `cog`} style={{ "--i": 2 }}>{props.wheelState === 2 ? "B" : null}</div>
        <div className={props.wheelState === 3 ? `cog active` : `cog`} style={{ "--i": 3 }}>{props.wheelState === 3 ? "B" : null}</div>
        <div className={props.wheelState === 4 ? `cog active` : `cog`} style={{ "--i": 4 }}>{props.wheelState === 4 ? "B" : null}</div>
        <div className={props.wheelState === 5 ? `cog active` : `cog`} style={{ "--i": 5 }}>{props.wheelState === 5 ? "B" : null}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button onClick={movementButtonHandler} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={movementButtonHandler} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  wheelState: state.wheel
})

export default connect(mapStateToProps,{moveClockwise,moveCounterClockwise})(Wheel)