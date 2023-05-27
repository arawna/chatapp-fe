import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => {
  return (
    <div style={{"fontSize":"80px"}}>Lütfen Bekleyiniz... <Spinner/></div>
  )
}

export default LoadingScreen