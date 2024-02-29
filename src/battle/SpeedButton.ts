import * as Phaser from 'phaser';
import { getSpeed, saveSpeed } from '../utils/localStorageUtils';

export class SpeedButton extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.createButton();
    this.createButtonText();
  }

  public event = 'event';

  private button: Phaser.GameObjects.Rectangle;
  private buttonText: Phaser.GameObjects.Text;

  public changeText(text: string): void {
    this.buttonText.text = `${text}x`;
    saveSpeed(text);
  }

  public getSpeed(): number {
    const speed = getSpeed();
    if (!speed) {
      return 1;
    }
    let parsedSpeed = parseFloat(speed);
    parsedSpeed = Math.min(2.0, Math.max(1.0, parsedSpeed));
    return parsedSpeed;
  }

  private createButton(): void {
    const buttonWidth = 120;
    const buttonHeight = 40;
    const buttonX = this.scene.cameras.main.width - buttonWidth / 2 - 20;
    const buttonY = this.scene.cameras.main.height - buttonHeight / 2 - 20;
    this.button = this.scene.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0x8b4513);
    this.button.setOrigin(0.5);
    this.button.setDepth(2);
    this.button.setInteractive({ cursor: 'pointer' });
    this.button.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.emit(this.event);
    });
  }

  private createButtonText(): void {
    this.buttonText = this.scene.add.text(0, 0, '1x', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#ffffff',
    });
    this.buttonText.setOrigin(0.5);
    this.buttonText.setDepth(2);
    Phaser.Display.Align.In.Center(this.buttonText, this.button);
    this.changeText(this.getSpeed().toString());
  }
}
