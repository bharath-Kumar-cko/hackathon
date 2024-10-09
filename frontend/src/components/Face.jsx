// import React, { useEffect, useRef } from "react";
// import * as faceapi from "@vladmandic/face-api";

// export const FaceDetection = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const loadModels = async () => {
//       //   const MODEL_URL = `${window.location.origin}/models`; // Corrected path
//       try {
//         // Load models
//         await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//         await faceapi.nets.faceExpressionNet.loadFromUri("/models");
//         await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
//         console.log("Models loaded successfully");
//       } catch (err) {
//         console.error("Model loading error: ", err); // Catch error and log it
//       }
//     };

//     const startVideo = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
//         videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.error("Error accessing the camera: ", err);
//       }
//     };

//     loadModels().then(startVideo);
//   }, []);

//   useEffect(() => {
//     const detectFaces = async () => {
//       if (videoRef.current) {
//         const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//         canvasRef.current.appendChild(canvas);
//         const displaySize = {
//           width: videoRef.current.width,
//           height: videoRef.current.height,
//         };
//         faceapi.matchDimensions(canvas, displaySize);

//         setInterval(async () => {
//           const detections = await faceapi
//             .detectAllFaces(
//               videoRef.current,
//               new faceapi.TinyFaceDetectorOptions()
//             )
//             .withFaceLandmarks()
//             .withFaceExpressions();

//           const resizedDetections = faceapi.resizeResults(
//             detections,
//             displaySize
//           );
//           canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//           faceapi.draw.drawDetections(canvas, resizedDetections);
//           faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//           faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//         }, 100);
//       }
//     };

//     detectFaces();
//   }, [videoRef]);

//   return (
//     <div>
//       <div ref={canvasRef} style={{ position: "absolute" }} />
//       <video
//         ref={videoRef}
//         autoPlay
//         style={{ width: "720px", height: "560px" }}
//       />
//     </div>
//   );
// };

export const Face = () => {
  return <div>Face</div>;
};
