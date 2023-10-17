// Request accelerometer access
async function requestAccess() {
  console.log('DeviceOrientationEvent', DeviceOrientationEvent)
  console.log('requestPermission', typeof DeviceOrientationEvent.requestPermission)
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    const permission = await DeviceOrientationEvent.requestPermission();
    if (permission === 'granted') {
      window.addEventListener('deviceorientation', handleOrientation);
    }
  } else {
    // Older browser, just add the listener.
    window.addEventListener('deviceorientation', handleOrientation);
  }
}

// Handle accelerometer data
function handleOrientation(event) {
  const { alpha, beta, gamma } = event;
  // Logic to decide when to show the next letter based on orientation
}

// Start the LED-like display
function startDisplay() {
  requestAccess
  const name = document.getElementById("nameInput").value;
  const display = document.getElementById("display");
  
  // Logic for animating the text display
  // ...
}

let nameIndex = 0;

function animateName(name) {
  requestAnimationFrame(() => {
    if (nameIndex < name.length) {
      // Show the letter at nameIndex
      // ...
      nameIndex++;
      animateName(name);
    }
  });
}

// Request permission on page load
window.onload = requestAccess;
