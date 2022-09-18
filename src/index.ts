import Phaser from 'phaser'
import { Game } from './game'

export default new Phaser.Game({
  title: 'Goblin Tribes',
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: [Game],
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
})
