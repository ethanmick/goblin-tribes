import EasyStar from 'easystarjs'
import { GoblinWorld } from './goblin-world'
import { Point } from './lib'

export class Goblin extends Phaser.Physics.Arcade.Sprite {
  speed: number = 1000
  lastMove: number = 0
  path?: Point[] | null

  constructor(
    scene: Phaser.Scene,
    public map: GoblinWorld,
    public tileX: number,
    public tileY: number
  ) {
    const { x, y } = Phaser.Tilemaps.Components.TileToWorldXY(
      tileX,
      tileY,
      new Phaser.Math.Vector2(0, 0),
      scene.cameras.main,
      map.tilemap.layer
    )
    super(scene, x, y, 'goblin')
    // Required
    scene.add.existing(this)
    scene.physics.add.existing(this)
    // Setup
    this.map = map
    this.setInteractive()
    this.setOrigin(0)
  }

  moveTo(x: number, y: number) {
    const easystar = new EasyStar.js()
    easystar.setGrid(this.map.getCollisionGrid())
    easystar.setAcceptableTiles([1])
    easystar.findPath(this.tileX, this.tileY, x, y, (path) => {
      path.shift() // Remove the first item, where the sprite currently is
      this.path = path
    })
    easystar.calculate()
  }

  update(t: number, dt: number): void {
    if (this.path && this.path.length > 0) {
      if (t > this.lastMove + this.speed) {
        this.lastMove = t
        const next = this.path.shift()
        if (!next) {
          return
        }
        const { x, y } = Phaser.Tilemaps.Components.TileToWorldXY(
          next.x,
          next.y,
          new Phaser.Math.Vector2(0, 0),
          this.scene.cameras.main,
          this.map.tilemap.layer
        )
        this.setPosition(x, y)
        this.tileX = next.x
        this.tileY = next.y
      }
    }
  }
}
