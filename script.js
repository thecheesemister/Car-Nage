const rectangle = document.getElementById("draggable");

let isDragging = false;
let targetX = 50, targetY = 50; // Target position for the spring effect
let posX = 50, posY = 50; // Current position of the rectangle
let offsetX = 0, offsetY = 0;

rectangle.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - rectangle.getBoundingClientRect().left;
    offsetY = e.clientY - rectangle.getBoundingClientRect().top;
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
    // Apply easing/spring effect
    posX += (targetX - posX) * 0.1;
    posY += (targetY - posY) * 0.1;

    rectangle.style.left = `${posX}px`;
    rectangle.style.top = `${posY}px`;

    requestAnimationFrame(animate);
}

animate();
