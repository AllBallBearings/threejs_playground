const canvas = document.getElementById('led-canvas');
const ctx = canvas.getContext('2d');
const nameInput = document.getElementById('name-input');
const startBtn = document.getElementById('start-btn');

let animationFrameId;
let ledRadius = 5;
let ledSpacing = 10;
let ledColor = '#00ff00';
let name = '';

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawLedName(position) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < name.length; i++) {
    let x = position + i * (ledRadius * 2 + ledSpacing);
    let y = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(x, y, ledRadius, 0, 2 * Math.PI);
    ctx.fillStyle = ledColor;
    ctx.fill();
  }
}

function animateLedName() {
  let position = -canvas.width / 2;
  let direction = 1;

  function animate() {
    position += 10 * direction;

    if (position > canvas.width) {
      position = -canvas.width / 2;
    } else if (position < -canvas.width / 2) {
      position = canvas.width;
    }

    drawLedName(position);
    animationFrameId = requestAnimationFrame(animate);
  }

  animationFrameId = requestAnimationFrame(animate);
}

function startAnimation() {
  name = nameInput.value.toUpperCase();
  nameInput.disabled = true;
  startBtn.disabled = true;
  resizeCanvas();
  animateLedName();
}

window.addEventListener('resize', resizeCanvas);
startBtn.addEventListener('click', startAnimation);