import React from 'react'
import './Card.css'

function Card(props: any) {
  return (
    <div id='card'>
      <div id='icon'>
        <img src={props.icon} alt="" />
      </div>
      <h3>{props.title}</h3>
      <p>{props.paragraph}</p>
    </div>
  )
}

export default Card