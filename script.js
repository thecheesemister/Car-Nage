let angle = 0;
document.getElementById("cube").addEventListener("click", function() {
  angle += 90;
  // Rotate the cube around the Y-axis. The translateZ keeps the cube centered.
  this.style.transform = `translateZ(-75px) rotateY(${angle}deg)`;
});
