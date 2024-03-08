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
let letterIndex = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawLetter(letter, position) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - (ledRadius + ledSpacing) * name.length / 2;

  const letterAngle = (position / name.length) * 2 * Math.PI - Math.PI / 2;
  const x = centerX + radius * Math.cos(letterAngle + angle);
  const y = centerY + radius * Math.sin(letterAngle + angle);

  const letterWidth = (ledRadius * 2 + ledSpacing) * letter.length;
  const startX = x - letterWidth / 2;
  const startY = y - (ledRadius + ledSpacing);

  for (let i = 0; i < letter.length; i++) {
    const charCode = letter.charCodeAt(i) - 65; // Assuming uppercase letters
    const charWidth = charCode % 7 + 3;
    const charHeight = Math.floor(charCode / 7) + 3;

    for (let row = 0; row < charHeight; row++) {
      for (let col = 0; col < charWidth; col++) {
        const dotX = startX + i * (ledRadius * 2 + ledSpacing) + col * (ledRadius * 2 + ledSpacing);
        const dotY = startY + row * (ledRadius * 2 + ledSpacing);

        ctx.beginPath();
        ctx.arc(dotX, dotY, ledRadius, 0, 2 * Math.PI);
        ctx.fillStyle = ledColor;
        ctx.fill();
      }
    }
  }
}

function animateLetter() {
  function animate() {
    drawLetter(name[letterIndex], letterIndex);
    letterIndex = (letterIndex + 1) % name.length;
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
    document.documentElement.webkitRequestFullscreen()