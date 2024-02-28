import ReactDOM from 'react-dom/client';
import FaceRecognition from './FaceRecognition';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Navigation from './Navigation';
import FaceDetection from './FaceDetection';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Navigation/> } />
          <Route path='/detectOnWebCam' element={<FaceDetection/>} />
          <Route path='/recognizeOnImages' element={<FaceRecognition/>} />
        </Routes>
      </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
