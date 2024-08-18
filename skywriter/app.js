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
    document.querySelector('.message').textContent = message[currentIndex];
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
