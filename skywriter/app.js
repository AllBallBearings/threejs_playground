const message = "HELLO WORLD";
let currentIndex = 0;

const updateMessage = () => {
    document.querySelector('.message').textContent = message[currentIndex];
    currentIndex = (currentIndex + 1) % message.length;
};

window.addEventListener('devicemotion', (event) => {
    const acceleration = event.accelerationIncludingGravity;
    
    // You can adjust these thresholds to fit the desired sensitivity
    if (Math.abs(acceleration.x) > 5 || Math.abs(acceleration.y) > 5) {
        updateMessage();
    }
});
