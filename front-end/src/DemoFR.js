// import React, { useEffect, useRef } from 'react';
// import * as faceapi from 'face-api.js';

// const FaceRecognition = () => {
//   const imageUploadRef = useRef(null);

//   useEffect(() => {

//     const start = async () => {
//     const container = document.createElement('div');
//     container.style.position = 'relative';
//     document.body.append(container);

//     const labeledFaceDescriptors = await loadLabeledImages();
//     const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

//     let image;
//     let canvas;

//     imageUploadRef.current.addEventListener('change', async () => {
//       if (image) image.remove();
//       if (canvas) canvas.remove();

//       image = await faceapi.bufferToImage(imageUploadRef.current.files[0]);
//       container.append(image);

//       canvas = faceapi.createCanvasFromMedia(image);
//       container.append(canvas);

//       const displaySize = { width: image.width, height: image.height-200 };
//       faceapi.matchDimensions(canvas, displaySize);

//       const detections = await faceapi.detectAllFaces(image)
//         .withFaceLandmarks()
//         .withFaceDescriptors();

//       const resizedDetections = faceapi.resizeResults(detections, displaySize);
//       const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
//       console.log(results);
//       results.forEach((result, i) => {
//         const box = resizedDetections[i].detection.box;
//         const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
//         drawBox.draw(canvas);
//       });
//     });
//   };

//     Promise.all([
//       faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//       faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//       faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
//     ]).then(start);

//   }, []);

  
//   const loadLabeledImages = async () => {
//     const labels = ['Sample', 'Sample2', 'Sample3', 'Siddharth'];
//     return Promise.all(
//       labels.map(async (label) => {
//         const descriptions = [];
//         for (let i = 1; i <= 2; i++) {
//           const img = await faceapi.fetchImage(`/labeled_images/${label}/${i}.jpg`);
//           const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
//           descriptions.push(detections.descriptor);
//         }
//         return new faceapi.LabeledFaceDescriptors(label, descriptions);
//       })
//     );
//   };

//   return (
//     <div className="container">
//       <div className="header">
//         <img src="/im.svg" alt="" />
//         <p>TUC Face-Recognition</p>
//       </div>
//       <input type="file" id="imageUpload" ref={imageUploadRef} />
//     </div>
//   );
// };

// export default FaceRecognition;