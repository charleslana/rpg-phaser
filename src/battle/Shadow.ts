import * as Phaser from 'phaser';
import { ICharacterAnimation } from '../interface/ICharacterAnimation';
import { shadowIcon } from '../data/assetKeys';

export class Shadow extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');
    this.create();
  }

  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  public set(
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    characterAnimation: ICharacterAnimation,
    isFlip: boolean
  ): void {
    const shadowX = isFlip ? -characterAnimation.shadowX! : characterAnimation.shadowX;
    this.sprite.setPosition(sprite.x + shadowX!, sprite.y + characterAnimation.shadowY!);
    this.sprite.body.setSize(100, 56);
    this.sprite.setOrigin(sprite.originX, sprite.originY);
    this.sprite.setScale(characterAnimation.shadowScale);
  }

  public show(): void {
    this.sprite.setVisible(true);
  }

  public hide(): void {
    this.sprite.setVisible(false);
  }

  private create(): void {
    this.sprite = this.scene.physics.add.sprite(this.x, this.y, shadowIcon);
  }
}
