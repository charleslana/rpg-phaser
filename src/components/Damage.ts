import * as Phaser from 'phaser';

export class Damage {
  constructor(scene: Phaser.Scene, sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    this.scene = scene;
    this.sprite = sprite;
  }

  private scene: Phaser.Scene;
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private damageText: Phaser.GameObjects.Text;
  private criticalText: Phaser.GameObjects.Text;
  private dodgeText: Phaser.GameObjects.Text;

  public createDamageText(isFlip = false): void {
    const centerX =
      this.sprite.x + (isFlip ? this.sprite.displayWidth / 2 : -this.sprite.displayWidth / 2);
    const centerY = this.sprite.y - this.sprite.displayHeight / 1.2;
    this.damageText = this.scene.add.text(centerX, centerY, '-100', {
      fontFamily: 'PressStart2P',
      fontSize: 30,
      color: '#FF0000',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      stroke: '#ffffff',
      strokeThickness: 2,
    });
    this.damageText.setOrigin(0.5);
    this.damageText.setDepth(4);
    this.hideDamageText();
    this.createCriticalText(isFlip);
    this.createDodgeText(isFlip);
  }

  public showDamageText(): void {
    this.damageText.setVisible(true);
  }

  public hideDamageText(): void {
    this.damageText.setVisible(false);
  }

  public changeDamageText(newText: string, speed: number): void {
    this.showDamageText();
    this.damageText.setText(newText);
    this.scene.tweens.add({
      targets: this.damageText,
      y: this.damageText.y - 30,
      alpha: 0,
      duration: 1000 / speed,
      ease: Phaser.Math.Easing.Linear,
      onComplete: () => {
        this.damageText.y += 30;
        this.damageText.setAlpha(1);
        this.hideDamageText();
      },
    });
  }

  public createCriticalText(isFlip = false): void {
    const centerX =
      this.sprite.x + (isFlip ? this.sprite.displayWidth / 2 : -this.sprite.displayWidth / 2);
    const centerY = this.sprite.y - this.sprite.displayHeight / 2;
    this.criticalText = this.scene.add.text(centerX, centerY, 'Crítico', {
      fontFamily: 'PressStart2P',
      fontSize: 30,
      color: '#ffa500',
      stroke: '#000000',
      strokeThickness: 2,
    });
    this.criticalText.setOrigin(0.5);
    this.criticalText.setDepth(3);
    this.criticalText.setAngle(-20);
    this.hideCriticalText();
  }

  public showCriticalText(): void {
    this.criticalText.setVisible(true);
  }

  public hideCriticalText(): void {
    this.criticalText.setVisible(false);
  }

  public enableCriticalText(speed: number): void {
    this.showCriticalText();
    this.scene.tweens.add({
      targets: this.criticalText,
      alpha: 0,
      duration: 1000 / speed,
      ease: Phaser.Math.Easing.Linear,
      onComplete: () => {
        this.criticalText.setAlpha(1);
        this.hideCriticalText();
      },
    });
  }

  public createDodgeText(isFlip = false): void {
    const centerX =
      this.sprite.x + (isFlip ? this.sprite.displayWidth / 2 : -this.sprite.displayWidth / 2);
    const centerY = this.sprite.y - this.sprite.displayHeight / 2;
    this.dodgeText = this.scene.add.text(centerX, centerY, 'Esquivou', {
      fontFamily: 'PressStart2P',
      fontSize: 30,
      color: '#808080',
      stroke: '#000000',
      strokeThickness: 2,
    });
    this.dodgeText.setOrigin(0.5);
    this.dodgeText.setDepth(3);
    this.dodgeText.setAngle(20);
    this.hideDodgeText();
  }

  public showDodgeText(): void {
    this.dodgeText.setVisible(true);
  }

  public hideDodgeText(): void {
    this.dodgeText.setVisible(false);
  }

  public enableDodgeText(speed: number): void {
    this.showDodgeText();
    this.scene.tweens.add({
      targets: this.dodgeText,
      alpha: 0,
      duration: 1000 / speed,
      ease: Phaser.Math.Easing.Cubic.In,
      onComplete: () => {
        this.dodgeText.setAlpha(1);
        this.hideDodgeText();
      },
    });
  }
}
