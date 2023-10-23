// Attach the event listener
window.addEventListener('deviceorientation', handleOrientation)

// Handle accelerometer data
function handleOrientation(event) {
  const { alpha, beta, gamma } = event
  // Logic to decide when to show the next letter based on orientation
  // Start the display if it hasn't started yet
  console.log(alpha)
  const alphaDisplay = document.getElementById("alpha")
  alphaDisplay.innerHTML = alpha
  if (alpha > 0 && alpha < 90) {
    startDisplay()
  }
}

// Start the LED-like display
function startDisplay() {
  const name = document.getElementById("nameInput").value
  //start the animation
  animateName(name)
}

function animateName(name) {
  const display = document.getElementById("display");
  console.log(name)
  let nameIndex = 0
  splitName = name.split("")
  requestAnimationFrame(function animate() {
    if (nameIndex < splitName.length) {
      //show the letter at nameIndex on the display
      display.innerHTML = splitName[nameIndex]
      nameIndex++;
      requestAnimationFrame(animate)
    }
  });
}
