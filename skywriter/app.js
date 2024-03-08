const canvas = document.getElementById('led-canvas');
const ctx = canvas.getContext('2d');
const nameInput = document.getElementById('name-input');
const startBtn = document.getElementById('start-btn');

let animationFrameId;
let ledRadius = 5;
let ledSpacing = 10;
let ledColor = '#00ff00';
let name = '';
let angle = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawLedName() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - (ledRadius + ledSpacing) * name.length / 2;

  for (let i = 0; i < name.length; i++) {
    const letterAngle = (i / name.length) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(letterAngle + angle);
    const y = centerY + radius * Math.sin(letterAngle + angle);

    ctx.beginPath();
    ctx.arc(x, y, ledRadius, 0, 2 * Math.PI);
    ctx.fillStyle = ledColor;
    ctx.fill();
  }
}

function animateLedName() {
  function animate() {
    drawLedName();
    animationFrameId = requestAnimationFrame(animate);
  }

  animationFrameId = requestAnimationFrame(animate);
}

function handleOrientation(event) {
  angle = (event.alpha * Math.PI) / 180;
}

function startAnimation() {
  name = nameInput.value.toUpperCase();
  nameInput.disabled = true;
  startBtn.disabled = true;
  resizeCanvas();

  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }

  window.addEventListener('deviceorientation', handleOrientation);
  animateLedName();
}

window.addEventListener('resize', resizeCanvas);
startBtn.addEventListener('click', startAnimation);