import * as Phaser from 'phaser';

export class FinalDialog extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.createBlocker();
    this.createOverlay();
    this.createModalBackground();
    this.createText();
    this.createButton();
  }

  public event = 'event';

  private blocker: Phaser.GameObjects.Rectangle;
  private overlay: Phaser.GameObjects.Rectangle;
  private modalBackground: Phaser.GameObjects.Rectangle;
  private modalX = this.scene.cameras.main.width / 2;
  private modalY = this.scene.cameras.main.height / 2;
  private text: Phaser.GameObjects.Text;
  private button: Phaser.GameObjects.Text;

  private createBlocker(): void {
    this.blocker = this.scene.add.rectangle(
      0,
      0,
      this.scene.cameras.main.width,
      this.scene.cameras.main.height,
      0x000000,
      0
    );
    this.blocker.setOrigin(0, 0);
    this.blocker.setInteractive();
    this.blocker.setDepth(996);
    this.blocker.on(Phaser.Input.Events.POINTER_DOWN, () => {});
  }

  private createOverlay(): void {
    this.overlay = this.scene.add.rectangle(
      0,
      0,
      this.scene.cameras.main.width,
      this.scene.cameras.main.height,
      0x000000,
      0.5
    );
    this.overlay.setOrigin(0, 0);
    this.overlay.setDepth(997);
  }

  private createModalBackground(): void {
    this.modalBackground = this.scene.add.rectangle(this.modalX, this.modalY, 500, 300, 0xffffff);
    this.modalBackground.setOrigin(0.5);
    this.modalBackground.setDepth(998);
  }

  private createText(): void {
    this.text = this.scene.add.text(
      this.modalX,
      this.modalY,
      'Batalha finalizada\nExp adquirido: +50\nGold adquirido: +15',
      {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#000000',
        align: 'center',
        wordWrap: {
          width: 480,
          useAdvancedWrap: true,
        },
      }
    );
    this.text.setOrigin(0.5);
    this.text.setDepth(999);
  }

  private createButton(): void {
    this.button = this.scene.add.text(this.modalX, this.modalY + 80, 'Fechar', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#007bff',
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
      },
    });
    this.button.setOrigin(0.5);
    this.button.setDepth(999);
    this.button.setInteractive({ cursor: 'pointer' });
    this.button.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.emitButton();
    });
  }

  private emitButton(): void {
    this.emit(this.event);
    this.blocker.destroy();
    this.overlay.destroy();
    this.modalBackground.destroy();
    this.text.destroy();
    this.button.destroy();
  }
}
