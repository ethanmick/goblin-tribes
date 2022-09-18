export class Goblin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'goblin')

    // Required
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // Setup
    this.setInteractive()
  }
}
