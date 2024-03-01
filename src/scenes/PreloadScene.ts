import * as Phaser from 'phaser';
import { homeSceneKey, preloadSceneKey } from '../data/sceneKeys';
import {
  battleBackground1,
  fireKnightAttackArea,
  fireKnightAttackAreaObject,
  fireKnightAttackMelee,
  fireKnightIdle,
  fireKnightRun,
  mageAttackArea,
  mageAttackAreaObject,
  mageIdle,
  rangerAttackRanged,
  rangerAttackRangedObject,
  rangerIdle,
  shadowIcon,
} from '../data/assetKeys';

export class PreloadScene extends Phaser.Scene {
  private progressBar: Phaser.GameObjects.Graphics;
  private progressBox: Phaser.GameObjects.Graphics;
  private loadingText: Phaser.GameObjects.Text;
  private percentText: Phaser.GameObjects.Text;
  private assetText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: preloadSceneKey });
  }

  preload(): void {
    this.createProgressBar();
    this.createLoadingText();
    this.createPercentText();
    this.createAssetText();
    this.setupLoadEvents();
    this.loadAssets();
  }

  private createProgressBar(): void {
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    const barWidth = 320;
    const barHeight = 50;
    const barX = (this.cameras.main.width - barWidth) / 2;
    const barY = (this.cameras.main.height - barHeight) / 2;
    this.progressBox.fillRect(barX, barY, barWidth, barHeight);
  }

  private createLoadingText(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });
    this.loadingText.setOrigin(0.5, 0.5);
  }

  private createPercentText(): void {
    const barWidth = 320;
    const barHeight = 50;
    const barX = (this.cameras.main.width - barWidth) / 2;
    const barY = (this.cameras.main.height - barHeight) / 2;
    this.percentText = this.make.text({
      x: barX + barWidth / 2,
      y: barY + barHeight / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });
    this.percentText.setOrigin(0.5, 0.5);
  }

  private createAssetText(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });
    this.assetText.setOrigin(0.5, 0.5);
  }

  private setupLoadEvents(): void {
    this.load.on(Phaser.Loader.Events.PROGRESS, this.handleProgressEvent, this);
    this.load.on(Phaser.Loader.Events.FILE_LOAD, this.handleLoadEvent, this);
    this.load.on(Phaser.Loader.Events.COMPLETE, this.handleCompleteEvent, this);
  }

  private handleProgressEvent(value: number): void {
    this.percentText.setText(`${Math.round(value * 100)}%`);
    this.progressBar.clear();
    this.progressBar.fillStyle(0xffffff, 1);
    const barWidth = 300;
    const barHeight = 30;
    const barY = (this.cameras.main.height - barHeight) / 2;
    const progressBarX = (this.cameras.main.width - barWidth) / 2;
    this.progressBar.fillRect(progressBarX, barY, barWidth * value, barHeight);
  }

  private handleLoadEvent(file: Phaser.Loader.File): void {
    this.assetText.setText('Loading asset: ' + file.key);
  }

  private handleCompleteEvent(): void {
    this.progressBar.destroy();
    this.progressBox.destroy();
    this.loadingText.destroy();
    this.percentText.destroy();
    this.assetText.destroy();
    this.scene.start(homeSceneKey);
  }

  private loadAssets(): void {
    this.loadBattleBackground();
    this.loadIcons();
    this.loadFireKnight();
    this.loadRanger();
    this.loadMage();
  }

  private loadBattleBackground(): void {
    this.load.image(battleBackground1, './assets/images/battle-bg/1.png');
  }

  private loadIcons(): void {
    this.load.image(shadowIcon, './assets/images/icons/shadow.png');
  }

  private loadFireKnight(): void {
    this.load.atlas(
      fireKnightIdle,
      './assets/images/characters/fire_knight/fire_knight_idle.png',
      './assets/images/characters/fire_knight/fire_knight_idle.json'
    );
    this.load.atlas(
      fireKnightRun,
      './assets/images/characters/fire_knight/fire_knight_run.png',
      './assets/images/characters/fire_knight/fire_knight_run.json'
    );
    this.load.atlas(
      fireKnightAttackMelee,
      './assets/images/characters/fire_knight/fire_knight_attack_melee.png',
      './assets/images/characters/fire_knight/fire_knight_attack_melee.json'
    );
    this.load.atlas(
      fireKnightAttackArea,
      './assets/images/characters/fire_knight/fire_knight_attack_area.png',
      './assets/images/characters/fire_knight/fire_knight_attack_area.json'
    );
    this.load.atlas(
      fireKnightAttackAreaObject,
      './assets/images/characters/fire_knight/fire_knight_attack_area_object.png',
      './assets/images/characters/fire_knight/fire_knight_attack_area_object.json'
    );
  }

  private loadRanger(): void {
    this.load.atlas(
      rangerIdle,
      './assets/images/characters/ranger/ranger_idle.png',
      './assets/images/characters/ranger/ranger_idle.json'
    );
    this.load.atlas(
      rangerAttackRanged,
      './assets/images/characters/ranger/ranger_attack_ranged.png',
      './assets/images/characters/ranger/ranger_attack_ranged.json'
    );
    this.load.atlas(
      rangerAttackRangedObject,
      './assets/images/characters/ranger/ranger_attack_ranged_object.png',
      './assets/images/characters/ranger/ranger_attack_ranged_object.json'
    );
  }

  private loadMage(): void {
    this.load.atlas(
      mageIdle,
      './assets/images/characters/mage/mage_idle.png',
      './assets/images/characters/mage/mage_idle.json'
    );
    this.load.atlas(
      mageAttackArea,
      './assets/images/characters/mage/mage_area.png',
      './assets/images/characters/mage/mage_area.json'
    );
    this.load.atlas(
      mageAttackAreaObject,
      './assets/images/characters/mage/mage_area_object.png',
      './assets/images/characters/mage/mage_area_object.json'
    );
  }
}
