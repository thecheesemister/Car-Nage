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
  this.load.image('car', 'https://i.ibb.co/r2qMbF7/images.png'); // updated car sprite
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
