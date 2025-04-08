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
  graphics.destroy(); // clean up the graphics object
}

function create() {
  car = this.physics.add.sprite(400, 300, 'car');
  car.setDamping(true);
  car.setDrag(0.98);
  car.setMaxVelocity(200);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.up.isDown) {
    this.physics.velocityFromRotation(car.rotation, 200, car.body.acceleration);
  } else {
    car.setAcceleration(0);
  }

  if (cursors.left.isDown) {
    car.setAngularVelocity(-150);
  } else if (cursors.right.isDown) {
    car.setAngularVelocity(150);
  } else {
    car.setAngularVelocity(0);
  }
}
