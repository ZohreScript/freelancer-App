import React from 'react'
import {ThreeDots} from "react-loader-spinner"
function Loading({width="75", height="40"}) {
  return (
    <ThreeDots heights={height} 
    wrapperStyle={{display: 'flex', justifyContent: 'center'}}
    width={width} radius={9} color="rgb(var(--color-primary-900))"/>
  )
}

export default Loading