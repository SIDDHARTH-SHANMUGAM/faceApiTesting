import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const CanvasComponent = ({ canvasRef }) => {
  return <div ref={canvasRef}></div>;
};

const FaceRecognition = () => {
  const imageUploadRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageElement, setImageElement] = useState(null);

  useEffect(() => {
    const start = async () => {
      const labeledFaceDescriptors = await loadLabeledImages();
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

      imageUploadRef.current.addEventListener('change', async () => {
        const image = await faceapi.bufferToImage(imageUploadRef.current.files[0]);

        const canvas = faceapi.createCanvasFromMedia(image);
        const displaySize = { width: image.width, height: image.height };
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi.detectAllFaces(image)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));

        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
          drawBox.draw(canvas);
        });

        setImageElement(image);
        canvasRef.current.innerHTML = ''; // Clear previous canvas
        canvasRef.current.appendChild(canvas);
      });
    };

    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    ]).then(start);

  }, []);

  const loadLabeledImages = async () => {
    const labels = ['Sample', 'Sample2', 'Sample3', 'Siddharth'];
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`/labeled_images/${label}/${i}.jpg`);
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  };

  return (
    <div className="container">
      <div className="header">
        <img src="/im.svg" alt="" />
        <p>Face-Recognition Testing</p>
      </div>
      <input type="file" id="imageUpload" ref={imageUploadRef} />
      {imageElement && <img src={imageElement.src} alt="Uploaded" />}
      <CanvasComponent canvasRef={canvasRef} />
    </div>
  );
};

export default FaceRecognition;
