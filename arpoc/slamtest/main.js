import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { AlvaAR } from '../helper_scripts/alva_ar.js';

document.addEventListener('DOMContentLoaded', async () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const width = 640;
  const height = 480;

  canvas.width = width;
  canvas.height = height;

  try {
    // Access the device camera
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width, height } });
    video.srcObject = stream;

    // Initialize AlvaAR
    const alva = await AlvaAR.Initialize(width, height);

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(width, height);

    // Add a simple cube to the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Position the cube
    cube.position.set(0, 0, -5);

    // Process each video frame
    const processFrame = () => {
      ctx.drawImage(video, 0, 0, width, height);
      const frame = ctx.getImageData(0, 0, width, height);
      const cameraPose = alva.findCameraPose(frame);

      if (cameraPose) {
        // Update Three.js camera position and orientation based on AlvaAR's camera pose
        const { position, rotation } = cameraPose;
        camera.position.set(position.x, position.y, position.z);
        camera.rotation.set(rotation.x, rotation.y, rotation.z);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(processFrame);
    };

    video.addEventListener('play', processFrame);
  } catch (error) {
    console.error('Error accessing the camera or initializing AlvaAR:', error);
  }
});
