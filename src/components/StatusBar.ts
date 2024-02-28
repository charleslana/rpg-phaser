import * as Phaser from 'phaser';

export class StatusBar {
  constructor(scene: Phaser.Scene, sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    this.scene = scene;
    this.sprite = sprite;
  }

  private scene: Phaser.Scene;
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private statusBarContainer: Phaser.GameObjects.Container;
  private spProgressBar: Phaser.GameObjects.Rectangle;
  private hpProgressBar: Phaser.GameObjects.Rectangle;

  public createStatusBarContainer(isFlip = false): void {
    this.statusBarContainer = this.scene.add.container(
      isFlip ? this.sprite.x : this.sprite.x - this.sprite.displayWidth,
      this.sprite.y - this.sprite.height * this.sprite.scaleY - 30
    );
    this.statusBarContainer.setDepth(1);
    const containerBackground = this.scene.add.graphics();
    containerBackground.fillStyle(0x808080, 0);
    containerBackground.fillRect(0, 0, this.sprite.displayWidth, 30);
    this.statusBarContainer.add(containerBackground);
    this.createSPBar();
    this.createHPBar();
  }

  public show(): void {
    this.statusBarContainer.setVisible(true);
  }

  public hide(): void {
    this.statusBarContainer.setVisible(false);
  }

  public updateHPWithAnimation(hp: number, maxHP: number, speed: number): void {
    const normalizedHP = hp / maxHP;
    const newWidth = normalizedHP * this.sprite.displayWidth;
    this.scene.tweens.add({
      targets: this.hpProgressBar,
      width: newWidth,
      duration: 500 / speed,
      ease: Phaser.Math.Easing.Sine,
      onComplete: () => {
        const isLowHP = hp / maxHP <= 0.25;
        if (isLowHP) {
          this.hpProgressBar.setFillStyle(0xff0000);
        }
      },
    });
  }

  public updateSPWithAnimation(sp: number, maxSP: number, speed: number): void {
    const normalizedHP = sp / maxSP;
    const newWidth = normalizedHP * this.sprite.displayWidth;
    this.scene.tweens.add({
      targets: this.spProgressBar,
      width: newWidth,
      duration: 500 / speed,
      ease: Phaser.Math.Easing.Sine,
      onComplete: () => {
        const isHighMP = sp / maxSP >= 1;
        if (isHighMP) {
          this.spProgressBar.setFillStyle(0xffff00);
        }
      },
    });
  }

  private createSPBar(): void {
    const progressBox = this.scene.add.graphics();
    progressBox.fillStyle(0x333333, 1);
    progressBox.fillRoundedRect(0, 0, this.sprite.displayWidth, 5, 2);
    this.spProgressBar = this.scene.add.rectangle(0, 0, this.sprite.displayWidth, 5, 0xffa500);
    this.spProgressBar.setOrigin(0, 0);
    this.updateSP(0, 100);
    this.statusBarContainer.add([progressBox, this.spProgressBar]);
  }

  private updateSP(sp: number, maxSP: number): void {
    const normalizedMP = sp / maxSP;
    const clampedWidth = Phaser.Math.Clamp(normalizedMP, 0, 1) * this.sprite.displayWidth;
    this.spProgressBar.width = clampedWidth;
  }

  private createHPBar(): void {
    const progressBox = this.scene.add.graphics();
    progressBox.fillStyle(0x333333, 1);
    progressBox.fillRoundedRect(0, 10, this.sprite.displayWidth, 10, 4);
    this.hpProgressBar = this.scene.add.rectangle(0, 10, this.sprite.displayWidth, 10, 0x00ff00);
    this.hpProgressBar.setOrigin(0, 0);
    this.hpProgressBar.y = 10;
    this.updateHP(100, 100);
    this.statusBarContainer.add([progressBox, this.hpProgressBar]);
  }

  private updateHP(hp: number, maxHP: number): void {
    const normalizedHP = hp / maxHP;
    const clampedWidth = Phaser.Math.Clamp(normalizedHP, 0, 1) * this.sprite.displayWidth;
    this.hpProgressBar.width = clampedWidth;
  }
}
