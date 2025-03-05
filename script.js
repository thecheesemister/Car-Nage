const rectangle = document.getElementById("draggable");

let isDragging = false;
let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
let posX = targetX, posY = targetY;
let velocityX = 0, velocityY = 0;
let angle = 0;
let offsetX = 0, offsetY = 0;

rectangle.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - rectangle.getBoundingClientRect().left - 50;
    offsetY = e.clientY - rectangle.getBoundingClientRect().top - 50;
    rectangle.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        targetX = e.clientX - offsetX;
        targetY = e.clientY - offsetY;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    rectangle.style.cursor = "grab";
});

function animate() {
    let dx = targetX - posX;
    let dy = targetY - posY;

    // Simulate acceleration (spring effect)
    velocityX += dx * 0.05;
    velocityY += dy * 0.05;

    // Simulate friction (slow down movement)
    velocityX *= 0.9;
    velocityY *= 0.9;

    // Apply new position
    posX += velocityX;
    posY += velocityY;

    // Calculate rotation angle based on movement direction
    angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);

    // Apply movement and rotation
    rectangle.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;

    requestAnimationFrame(animate);
}

animate();
