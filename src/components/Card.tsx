import React from 'react'
import './Card.css'

function Card(props: any) {
  return (
    <div id='card'>
      <div id='icon'>
        <img src={props.icon} alt="" />
      </div>
      <h6>{props.title}</h6>
      <p>{props.paragraph}</p>
    </div>
  )
}

export default Card