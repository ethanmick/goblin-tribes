export class Game extends Phaser.Scene {
  controls!: Phaser.Cameras.Controls.FixedKeyControl

  constructor() {
    super('game')
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/map_v001.json')
    this.load.image('tileset_01', 'assets/tileset_v01.png')
  }

  create() {
    const map = this.make.tilemap({ key: 'map' })
    const tileset = map.addTilesetImage('tileset_v01', 'tileset_01')
    const layer = map.createLayer('terrain', tileset, 0, 0)

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
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
  }

  update(t: number, dt: number) {
    this.controls.update(dt)
  }
}
