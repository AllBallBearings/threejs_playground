import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { AlvaAR } from './helper_scripts/alva_ar.js';

document.addEventListener('DOMContentLoaded', async () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const width = 640;
  const height = 480;

  canvas.width = width;
  canvas.height = height;

  // Create and display a loading status element
  const statusElement = document.createElement('div');
  statusElement.style.position = 'absolute';
  statusElement.style.top = '10px';
  statusElement.style.left = '10px';
  statusElement.style.padding = '5px 10px';
  statusElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  statusElement.style.color = '#fff';
  statusElement.style.fontFamily = 'Arial, sans-serif';
  statusElement.style.fontSize = '14px';
  statusElement.style.borderRadius = '5px';
  statusElement.innerText = 'Initializing...';
  document.body.appendChild(statusElement);

  try {
    // Update status: Accessing camera
    statusElement.innerText = 'Accessing camera...';
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width, height } });
    video.srcObject = stream;

    // Update status: Initializing AlvaAR
    statusElement.innerText = 'Initializing AlvaAR...';
    const alva = await AlvaAR.Initialize(width, height);

    // Update status: Setting up Three.js scene
    statusElement.innerText = 'Setting up scene...';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(width, height);

    // Add a simple cube to the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.set(0, 0, -5);

    // Update status: Starting video playback
    statusElement.innerText = 'Starting video...';
    await video.play();

    // Update status: Processing frames
    statusElement.innerText = 'Processing frames...';

    // Process each video frame
    const processFrame = () => {
      ctx.drawImage(video, 0, 0, width, height);
      const frame = ctx.getImageData(0, 0, width, height);
      const cameraPose = alva.findCameraPose(frame);

      if (cameraPose) {
        const { position, rotation } = cameraPose;
        camera.position.set(position.x, position.y, position.z);
        camera.rotation.set(rotation.x, rotation.y, rotation.z);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(processFrame);
    };

    processFrame();

    // Remove status element after initialization
    document.body.removeChild(statusElement);
  } catch (error) {
    console.error('Error during initialization:', error);
    statusElement.innerText = 'Initialization failed. Check console for details.';
  }
});
