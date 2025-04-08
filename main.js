const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#333',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let car;
let cursors;

function preload() {
  // Create a rectangle graphic and convert it to a texture called 'car'
  const carWidth = 40;
  const carHeight = 20;
  const graphics = this.add.graphics();
  graphics.fillStyle(0xffa500, 0.6); // faded orange (opacity 0.6)
  graphics.fillRect(0, 0, carWidth, carHeight);
  graphics.generateTexture('car', carWidth, carHeight);
  graphics.destroy(); // destroy the graphic object after generating the texture
}

function create() {
  car = this.physics.add.sprite(400, 300, 'car');

  car.setDamping(true);        // enable smooth damping
  car.setDrag(0.98);           // stronger linear friction (tune as needed)
  car.setAngularDrag(300);     // rotational drag to slow down spin
  car.setMaxVelocity(200);     // set a top speed (can be adjusted)

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Accelerate forward based on rotation if up arrow is pressed
  if (cursors.up.isDown) {
    this.physics.velocityFromRotation(car.rotation, 200, car.body.acceleration);
  } else {
    car.setAcceleration(0); // stop accelerating if up arrow is not pressed
  }

  // Turn the car left or right based on arrow keys
  if (cursors.left.isDown) {
    car.setAngularVelocity(-150); // turn left
  } else if (cursors.right.isDown) {
    car.setAngularVelocity(150);  // turn right
  } else {
    car.setAngularVelocity(0);    // no turning if no left/right input
  }
}
