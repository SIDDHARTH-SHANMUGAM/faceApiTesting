import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navigation() {
    const navigate = useNavigate();
    const gotoFaceDetectUsingWeb = () =>{
        navigate('/detectOnWebCam')
    }
    const gotoFaceRecognitionusingImages = () =>{
        navigate('/recognizeOnImages')
    }
  return (
    <div>
      <h1 onClick={gotoFaceDetectUsingWeb}>Face Detection On WEB CAM</h1>
      <h1 onClick={gotoFaceRecognitionusingImages}>Face Recognition Using Images</h1>
    </div>
  )
}

export default Navigation
