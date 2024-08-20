document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  const message = "HELLO WORLD";
  let currentIndex = 0;
  let lastX = null;
  let lastY = null;
  let lastZ = null;

  const updateMessage = (direction) => {
    if (direction === "right") {
      currentIndex = (currentIndex + 1) % message.length;
    } else if (direction === "left") {
      currentIndex = (currentIndex - 1 + message.length) % message.length;
    }
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message[currentIndex];
    console.log('Current message content:', messageElement.textContent);
  };

  window.addEventListener('devicemotion', (event) => {
    const acceleration = event.accelerationIncludingGravity;
    const x = acceleration.x;
    const y = acceleration.y;
    const z = acceleration.z;

    if (lastX === null && lastY === null && lastZ === null) {
      lastX = x;
      lastY = y;
      lastZ = z;
      return;
    }

    const deltaX = x - lastX;
    const deltaY = y - lastY;
    const deltaZ = z - lastZ;

    if (Math.abs(deltaX) > 3) {
      const direction = deltaX > 0 ? "right" : "left";
      updateMessage(direction);
    }

    lastX = x;
    lastY = y;
    lastZ = z;
  });

    // Function to simulate devicemotion event
  const simulateDeviceMotion = (x, y, z) => {
    const event = new Event('devicemotion');
    event.accelerationIncludingGravity = { x, y, z };
    window.dispatchEvent(event);
  };

  // Oscillate back and forth
  let direction = 1;
  const intervalId = setInterval(() => {
    simulateDeviceMotion(direction * 5, 0, 0); // Simulate motion
    direction *= -1; // Toggle direction
  }, 1000); // Change direction every second

  // Stop the oscillation when the button is clicked
  document.getElementById('stopButton').addEventListener('click', () => {
    clearInterval(intervalId);
    console.log('Oscillation stopped');
  });
});  
