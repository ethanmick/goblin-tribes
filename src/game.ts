import { Goblin } from './goblin'
import { GoblinWorld } from './goblin-world'

export class Game extends Phaser.Scene {
  map!: GoblinWorld
  controls!: Phaser.Cameras.Controls.FixedKeyControl
  units!: Phaser.Physics.Arcade.Group
  selected?: Goblin
  last?: Phaser.Tilemaps.Tile
  shiftKey!: Phaser.Input.Keyboard.Key

  constructor() {
    super('game')
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/map_v001.json')
    this.load.image('tileset_01', 'assets/tileset_v01.png')
    this.load.image('goblin', 'assets/goblin.png')
  }

  create() {
    this.input.mouse.disableContextMenu()
    const self = this
    this.units = this.physics.add.group()
    this.units.runChildUpdate = true

    this.map = new GoblinWorld(this)
    const tileset = this.map.tilemap.addTilesetImage(
      'tileset_v01',
      'tileset_01'
    )
    const layer = this.map.tilemap.createLayer('terrain', tileset, 0, 0)

    this.cameras.main.setBounds(
      0,
      0,
      this.map.tilemap.widthInPixels,
      this.map.tilemap.heightInPixels
    )
    this.cameras.main.zoom = 8
    this.cameras.main.setScroll(-300, -150) // change

    var cursors = this.input.keyboard.createCursorKeys()
    var controlConfig: Phaser.Types.Cameras.Controls.FixedKeyControlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      zoomSpeed: 0.1,
      minZoom: 4,
      maxZoom: 10,
      speed: 0.1,
    }

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig)

    for (let i = 0; i < 5; i++) {
      const goblin = new Goblin(
        this,
        this.map,
        Phaser.Math.Between(10, 20),
        Phaser.Math.Between(10, 20)
      )
      this.units.add(goblin)

      goblin.on(
        'pointerup',
        function (this: Goblin) {
          self.selected = this
          this.setTint(0xff0000)
        },
        goblin
      )
    }

    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      if (this.selected) {
        const tile = this.map.tilemap.getTileAtWorldXY(p.worldX, p.worldY)
        this.selected.moveTo(tile.x, tile.y)
      }
    })

    this.shiftKey = this.input.keyboard.addKey('SHIFT')
  }

  // var tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

  update(t: number, dt: number) {
    this.controls.update(dt)

    if (this.last) {
      this.last.alpha = 1
    }

    const tile = this.map.tilemap.getTileAtWorldXY(
      this.input.mousePointer.worldX,
      this.input.mousePointer.worldY
    )
    tile.alpha = 0.5
    this.last = tile

    if (this.shiftKey.isDown) {
      const props = this.map.getTileData(tile.x, tile.y)
      console.log('Name', props.name)
    }
  }
}
