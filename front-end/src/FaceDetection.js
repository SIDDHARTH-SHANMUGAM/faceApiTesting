import {useRef,useEffect} from 'react'
import './App.css'
import * as faceapi from 'face-api.js'

function FaceDetection(){
  const videoRef = useRef()
  const canvasRef = useRef()

  useEffect(()=>{
    startVideo()
    videoRef && loadModels()

  },[])

  const startVideo = ()=>{
    navigator.mediaDevices.getUserMedia({video:true})
    .then((currentStream)=>{
      videoRef.current.srcObject = currentStream
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const loadModels = ()=>{
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")

      ]).then(()=>{
      detect()
    })
  }
  const detect = ()=>{
    setInterval(async()=>{
      const detections = await faceapi.detectAllFaces(videoRef.current,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
      faceapi.matchDimensions(canvasRef.current,{
        width:940,
        height:650
      })
      const resized = faceapi.resizeResults(detections,{
         width:940,
        height:650
      })
      faceapi.draw.drawDetections(canvasRef.current,resized)
      faceapi.draw.drawFaceLandmarks(canvasRef.current,resized)
      faceapi.draw.drawFaceExpressions(canvasRef.current,resized)
    },1000)
  }

  return (
    <div className="container">
    <h1>Face Detection</h1>
      <div className="videoContainer">
      <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      <canvas ref={canvasRef} width="940" height="650" className="appcanvas"/>
    </div>
    )

}
export default FaceDetection;