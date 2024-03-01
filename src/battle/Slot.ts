import * as Phaser from 'phaser';
import { Character } from './Character';

export class Slot extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.calculateSlotPositions();
  }

  private slotWidth = 80;
  private slotHeight = 120;
  private slotPaddingX = 20;
  private slotPaddingY = 20;
  private startXFront: number;
  private startXBack: number;
  private startY: number;
  private maxSlot = 6;
  private slotAlpha = process.env.DEBUG ? 1 : 0;

  public setPlayers(players: Character[]): void {
    for (let i = 1; i <= this.maxSlot; i++) {
      let x: number, y: number;
      if (i <= 3) {
        x = this.startXBack;
        y = this.startY + (i - 1) * (this.slotHeight + this.slotPaddingY);
      } else {
        x = this.startXFront;
        y = this.startY + (i - 4) * (this.slotHeight + this.slotPaddingY);
      }
      const slot = this.scene.add.rectangle(
        x,
        y,
        this.slotWidth,
        this.slotHeight,
        0xffffff,
        this.slotAlpha
      );
      slot.setOrigin(1, 1);
      slot.setStrokeStyle(2, 0x000000, this.slotAlpha);
      players.forEach(player => {
        if (i === player.slot) {
          player.setPosition(x, y);
          player.sprite.setPosition(x, y);
          player.createCharacterInfo();
        }
      });
    }
  }

  public setEnemies(enemies: Character[]): void {
    for (let i = 1; i <= this.maxSlot; i++) {
      let x: number, y: number;
      if (i <= 3) {
        x = this.scene.cameras.main.width - this.startXBack;
        y = this.startY + (i - 1) * (this.slotHeight + this.slotPaddingY);
      } else {
        x = this.scene.cameras.main.width - this.startXFront;
        y = this.startY + (i - 4) * (this.slotHeight + this.slotPaddingY);
      }
      const slot = this.scene.add.rectangle(
        x,
        y,
        this.slotWidth,
        this.slotHeight,
        0xffffff,
        this.slotAlpha
      );
      slot.setOrigin(0, 1);
      slot.setStrokeStyle(2, 0x000000, this.slotAlpha);
      enemies.forEach(enemy => {
        if (i === enemy.slot) {
          enemy.setPosition(x, y);
          enemy.sprite.setPosition(x, y);
          enemy.createCharacterInfo(true);
        }
      });
    }
  }

  private calculateSlotPositions(): void {
    const offsetX = 150;
    this.startXFront = offsetX + this.slotWidth / 2;
    this.startXBack = offsetX + this.slotWidth / 2 + this.slotWidth + this.slotPaddingX + 40;
    const offsetY = 170;
    this.startY = offsetY + this.slotHeight / 2 + this.slotPaddingY;
  }
}
