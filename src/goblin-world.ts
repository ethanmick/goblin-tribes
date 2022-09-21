export class GoblinWorld {
  public readonly tilemap: Phaser.Tilemaps.Tilemap

  constructor(public readonly scene: Phaser.Scene) {
    this.tilemap = scene.add.tilemap('map')
  }

  getCollisionGrid(): Array<Array<number>> {
    const tm = this.tilemap
    const grid: Array<Array<number>> = []
    for (let y = 0; y < tm.height - 1; y++) {
      const row: Array<number> = []
      for (let x = 0; x < tm.width - 1; x++) {
        const tile = tm.getTileAt(x, y, undefined, 'terrain')
        row.push(tile.index)
      }
      grid.push(row)
    }
    return grid
  }
}
