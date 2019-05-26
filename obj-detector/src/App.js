import React, {useRef, useEffect} from 'react';
import './App.css';
import * as cocoSsd from "@tensorflow-models/coco-ssd";

function App() {
  // Loading the model comes with a Promise. Will proceed only when the promise is fulfilled. 
  const modelPromise = cocoSsd.load('mobilenet_v2');
  // Define references to be used later
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  // Utilities functions
  const detection = (video, model) => {
    model.detect(video).then(predictions => {
      drawBBox(predictions);
    });
    requestAnimationFrame(() => detection(video, model));
  };

  const drawBBox = predictions => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.textBaseline = 'bottom';
    ctx.font = '12px sans-serif';

    predictions.forEach(prediction => {
      const predText = prediction.class + ' ' + (prediction.score * 100).toFixed(2);
      const textWidth = ctx.measureText(predText).width;
      const textHeight = parseInt(ctx.font, 10);
      ctx.strokeRect(prediction.bbox[0], prediction.bbox[1], prediction.bbox[2], prediction.bbox[3]);
      ctx.fillStyle = '#F00';
      ctx.fillRect(prediction.bbox[0]-ctx.lineWidth/2, prediction.bbox[1], textWidth + ctx.lineWidth, -textHeight);
      ctx.fillStyle = '#FFF'
      ctx.fillText(predText, prediction.bbox[0], prediction.bbox[1]);
    });
  };
  // Start of Main App upon mounting or updating
  useEffect(() => {
    // Define the constraints for the mediaDevices
    const constraints = {
      audio: false,
      video: {facingMode: 'environment'}
    };
    // Check user's browser media capabilities
    if (navigator.mediaDevices.getUserMedia) {
      const camPromise = navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        videoRef.current.srcObject = stream;
        return new Promise(resolve => videoRef.current.onloadedmetadata = resolve);
      })
      .catch(err => {
        alert('You need to activate your camera and refresh the page!')
      });
      // Start detection once both the model and the camera are ready.
      Promise.all([modelPromise, camPromise])
      .then(values => detection(videoRef.current, values[0]))
      .catch(error => console.error(error));
    }
    else {
      alert('Your browser doesn\'t support this function. You may consider to install Google Chrome instead.');
    }
  });
  // Render the app
  return (
    <>
      <video
        ref={videoRef}
        className='app-position'
        autoPlay
        playsInline
        muted
        width={winWidth}
        height={winHeight}
      />
      <canvas
        ref={canvasRef}
        className='app-position'
        width={winWidth}
        height={winHeight}
      />
    </>
    );
}
export default App;