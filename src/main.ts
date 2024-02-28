import * as Phaser from 'phaser';
import { BattleScene } from './scenes/BattleScene';
import { Game, Types } from 'phaser';
import { HomeScene } from './scenes/HomeScene';
import { PreloadScene } from './scenes/PreloadScene';

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    width: 1024,
    height: 576,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  banner: false,
  audio: {
    disableWebAudio: true,
  },
  scene: [PreloadScene, HomeScene, BattleScene],
};

export default new Game(config);
