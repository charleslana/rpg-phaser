import * as Phaser from 'phaser';
import { Damage } from '../components/Damage';
import { getCharacterAnimation } from '../utils/characterUtils';
import { IAnimation } from '../interface/IAnimation';
import { IBattleCharacter } from '../interface/IBattleCharacter';
import { ICharacterAnimation } from '../interface/ICharacterAnimation';
import { StatusBar } from '../components/StatusBar';

export class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');
  }

  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public slot: number;
  public statusBar: StatusBar;
  public damage: Damage;
  public spriteObject: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public characterAnimation: ICharacterAnimation;
  public isFlip: boolean;
  public id: number;

  public createCharacter(battleCharacter: IBattleCharacter): void {
    this.characterAnimation = getCharacterAnimation(battleCharacter.characterId);
    this.createAnimations(battleCharacter.characterId);
    this.sprite = this.scene.physics.add.sprite(this.x, this.y, this.characterAnimation.idle!.key);
    this.id = battleCharacter.id;
    this.isFlip = battleCharacter.isFlip ?? false;
    this.setupSprite();
    this.slot = battleCharacter.slot;
    this.sprite.anims.play(this.characterAnimation.idle!.key, true);
  }

  public updateAnimationSpeed(newSpeed: number): void {
    const currentAnimation = this.sprite.anims.currentAnim as IAnimation;
    if (currentAnimation) {
      currentAnimation.frameRate = currentAnimation.frameRateStart * newSpeed;
      this.sprite.anims.play(currentAnimation.key);
    }
  }

  public changeIdleAnimation(speed: number): void {
    this.sprite.anims.play(this.characterAnimation.idle!.key);
    this.setupSprite();
    this.updateAnimationSpeed(speed);
  }

  public changeRunAnimation(speed: number): void {
    this.sprite.anims.play(this.characterAnimation.run!.key);
    this.setupSprite();
    this.updateAnimationSpeed(speed);
  }

  public changeAttackMeleeAnimation(speed: number): number {
    this.sprite.anims.play(this.characterAnimation.attackMelee!.key);
    this.setupSprite();
    this.updateAnimationSpeed(speed);
    return this.sprite.anims.currentAnim!.duration;
  }

  public changeAttackRangedAnimation(speed: number): number {
    this.sprite.anims.play(this.characterAnimation.attackRanged!.key);
    this.setupSprite();
    this.updateAnimationSpeed(speed);
    return this.sprite.anims.currentAnim!.duration;
  }

  public changeAttackAreaAnimation(speed: number): number {
    this.sprite.anims.play(this.characterAnimation.attackArea!.key);
    this.setupSprite();
    this.updateAnimationSpeed(speed);
    return this.sprite.anims.currentAnim!.duration;
  }

  public changeAttackMeleeAreaAnimation(speed: number): number {
    this.sprite.anims.play(this.characterAnimation.attackMeleeArea!.key);
    this.setupSprite();
    this.updateAnimationSpeed(speed);
    return this.sprite.anims.currentAnim!.duration;
  }

  public enableAttackRangedObjectAnimation(speed: number): number {
    const x = this.isFlip
      ? this.x - this.characterAnimation.attackRangedObject!.positionX!
      : this.x + this.characterAnimation.attackRangedObject!.positionX!;
    this.spriteObject = this.scene.physics.add.sprite(
      x,
      this.y + this.characterAnimation.attackRangedObject!.positionY!,
      this.characterAnimation.attackRangedObject!.key
    );
    this.spriteObject.setScale(this.characterAnimation.attackRangedObject!.scale);
    this.spriteObject.anims.play(this.characterAnimation.attackRangedObject!.key);
    this.spriteObject.setCollideWorldBounds(true);
    if (this.isFlip) {
      this.spriteObject.setOrigin(0, 1);
    } else {
      this.spriteObject.setOrigin(1, 1);
    }
    this.spriteObject.setFlipX(this.isFlip);
    this.sprite.setDepth(1);
    const currentAnimation = this.spriteObject.anims.currentAnim as IAnimation;
    if (currentAnimation) {
      currentAnimation.frameRate = currentAnimation.frameRateStart * speed;
      this.spriteObject.anims.play(currentAnimation.key);
    }
    return this.spriteObject.anims.currentAnim!.duration;
  }

  public enableAttackAreaObjectAnimation(speed: number): number {
    const distanceFromRightEdge = this.characterAnimation.attackAreaObject!.positionX!;
    let x: number;
    if (!this.isFlip) {
      x = this.scene.cameras.main.width - distanceFromRightEdge;
    } else {
      x = distanceFromRightEdge;
    }
    this.spriteObject = this.scene.physics.add.sprite(
      x,
      this.characterAnimation.attackAreaObject!.positionY!,
      this.characterAnimation.attackAreaObject!.key
    );
    this.spriteObject.setScale(this.characterAnimation.attackAreaObject!.scale);
    this.spriteObject.anims.play(this.characterAnimation.attackAreaObject!.key);
    this.spriteObject.setCollideWorldBounds(true);
    if (this.isFlip) {
      this.spriteObject.setOrigin(0, 1);
    } else {
      this.spriteObject.setOrigin(1, 1);
    }
    this.spriteObject.setFlipX(this.isFlip);
    this.sprite.setDepth(1);
    const currentAnimation = this.spriteObject.anims.currentAnim as IAnimation;
    if (currentAnimation) {
      currentAnimation.frameRate = currentAnimation.frameRateStart * speed;
      this.spriteObject.anims.play(currentAnimation.key);
    }
    return this.spriteObject.anims.currentAnim!.duration;
  }

  public enableAttackMeleeAreaObjectAnimation(speed: number): number {
    const distanceFromRightEdge = this.characterAnimation.attackMeleeAreaObject!.positionX!;
    let x: number;
    if (!this.isFlip) {
      x = this.scene.cameras.main.width - distanceFromRightEdge;
    } else {
      x = distanceFromRightEdge;
    }
    this.spriteObject = this.scene.physics.add.sprite(
      x,
      this.characterAnimation.attackMeleeAreaObject!.positionY!,
      this.characterAnimation.attackMeleeAreaObject!.key
    );
    this.spriteObject.setScale(this.characterAnimation.attackMeleeAreaObject!.scale);
    this.spriteObject.anims.play(this.characterAnimation.attackMeleeAreaObject!.key);
    this.spriteObject.setCollideWorldBounds(true);
    if (this.isFlip) {
      this.spriteObject.setOrigin(0, 1);
    } else {
      this.spriteObject.setOrigin(1, 1);
    }
    this.spriteObject.setFlipX(this.isFlip);
    this.sprite.setDepth(1);
    const currentAnimation = this.spriteObject.anims.currentAnim as IAnimation;
    if (currentAnimation) {
      currentAnimation.frameRate = currentAnimation.frameRateStart * speed;
      this.spriteObject.anims.play(currentAnimation.key);
    }
    return this.spriteObject.anims.currentAnim!.duration;
  }

  public blinkSprite(speed: number): void {
    const tween = this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0,
      duration: 100,
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        this.scene.time.delayedCall(500 / speed, () => {
          tween.stop();
          this.sprite.setAlpha(1);
        });
      },
    });
  }

  public createCharacterInfo(isFlip = false): void {
    this.statusBar = new StatusBar(this.scene, this.sprite);
    this.statusBar.createStatusBarContainer(isFlip);
    this.damage = new Damage(this.scene, this.sprite);
    this.damage.createDamageText(isFlip);
  }

  private setupSprite(): void {
    this.sprite.setScale(this.characterAnimation.scaleX);
    if (this.isFlip) {
      this.sprite.setOrigin(0, 1);
    } else {
      this.sprite.setOrigin(1, 1);
    }
    this.sprite.setFlipX(this.isFlip);
    this.sprite.setDepth(1);
    this.sprite.body.setSize(this.sprite.width, this.sprite.height);
  }

  private createAnimations(characterId: number): void {
    const characterAnimation = getCharacterAnimation(characterId);
    this.createIdleAnimation(characterAnimation);
    this.createRunAnimation(characterAnimation);
    this.createAttackMeleeAnimation(characterAnimation);
    this.createAttackRangedAnimation(characterAnimation);
    this.createAttackRangedObjectAnimation(characterAnimation);
    this.createAttackAreaAnimation(characterAnimation);
    this.createAttackAreaObjectAnimation(characterAnimation);
    this.createAttackMeleeAreaAnimation(characterAnimation);
    this.createAttackMeleeAreaObjectAnimation(characterAnimation);
  }

  private createIdleAnimation(characterAnimation: ICharacterAnimation): void {
    if (!this.scene.anims.exists(characterAnimation.idle!.key)) {
      const animation = this.scene.anims.create({
        key: characterAnimation.idle!.key,
        frames: characterAnimation.idle!.frames,
        frameRate: characterAnimation.idle!.frameRate,
        repeat: characterAnimation.idle!.repeat,
        yoyo: characterAnimation.idle!.yoyo,
      }) as IAnimation;
      animation.frameRateStart = characterAnimation.idle!.frameRateStart!;
    }
  }

  private createRunAnimation(characterAnimation: ICharacterAnimation): void {
    if (characterAnimation.run && !this.scene.anims.exists(characterAnimation.run.key)) {
      const animation = this.scene.anims.create({
        key: characterAnimation.run.key,
        frames: characterAnimation.run.frames,
        frameRate: characterAnimation.run.frameRate,
        repeat: characterAnimation.run.repeat,
        yoyo: characterAnimation.run.yoyo,
      }) as IAnimation;
      animation.frameRateStart = characterAnimation.run.frameRateStart!;
    }
  }

  private createAttackMeleeAnimation(characterAnimation: ICharacterAnimation): void {
    if (
      characterAnimation.attackMelee &&
      !this.scene.anims.exists(characterAnimation.attackMelee.key)
    ) {
      const animation = this.scene.anims.create({
        key: characterAnimation.attackMelee.key,
        frames: characterAnimation.attackMelee.frames,
        frameRate: characterAnimation.attackMelee.frameRate,
        repeat: characterAnimation.attackMelee.repeat,
        yoyo: characterAnimation.attackMelee.yoyo,
      }) as IAnimation;
      animation.frameRateStart = characterAnimation.attackMelee.frameRateStart!;
    }
  }

  private createAttackRangedAnimation(characterAnimation: ICharacterAnimation): void {
    if (
      characterAnimation.attackRanged &&
      !this.scene.anims.exists(characterAnimation.attackRanged.key)
    ) {
      const animation = this.scene.anims.create({
        key: characterAnimation.attackRanged.key,
        frames: characterAnimation.attackRanged.frames,
        frameRate: characterAnimation.attackRanged.frameRate,
        repeat: characterAnimation.attackRanged.repeat,
        yoyo: characterAnimation.attackRanged.yoyo,
      }) as IAnimation;
      animation.frameRateStart = characterAnimation.attackRanged.frameRateStart!;
    }
  }

  private createAttackRangedObjectAnimation(characterAnimation: ICharacterAnimation): void {
    if (
      characterAnimation.attackRangedObject &&
      !this.scene.anims.exists(characterAnimation.attackRangedObject.key)
    ) {
      const animation = this.scene.anims.create({
        key: characterAnimation.attackRangedObject.key,
        frames: characterAnimation.attackRangedObject.frames,
        frameRate: characterAnimation.attackRangedObject.frameRate,
        repeat: characterAnimation.attackRangedObject.repeat,
        yoyo: characterAnimation.attackRangedObject.yoyo,
      }) as IAnimation;
      animation.frameRateStart = characterAnimation.attackRangedObject.frameRateStart!;
    }
  }

  private createAttackAreaAnimation(characterAnimation: ICharacterAnimation): void {
    if (
      characterAnimation.attackArea &&
      !this.scene.anims.exists(characterAnimation.attackArea.key)
    ) {
      const animation = this.scene.anims.create({
        key: characterAnimation.attackArea.key,
        frames: characterAnimation.attackArea.frames,
        frameRate: characterAnimation.attackArea.frameRate,
        repeat: characterAnimation.attackArea.repeat,
        yoyo: characterAnimation.attackArea.yoyo,
      }) as IAnimation;
      animation.frameRateStart = characterAnimation.attackArea.frameRateStart!;
    }
  }

  private createAttackAreaObjectAnimation(characterAnimation: ICharacterAnimation): void {
    if (
      characterAnimation.attackAreaObject &&
      !this.scene.anims.exists(characterAnimation.attackAreaObject.key)
    ) {
      const animation = this.scene.anims.create({
        key: characterAnimation.attackAreaObject.key,
        frames: characterAnimation.attackAreaObject.frames,
        frameRate: characterAnimation.attackAreaObject.frameRate,
        repeat: characterAnimation.attackAreaObject.repeat,
        yoyo: characterAnimation.attackAreaObject.yoyo,
      }) as IAnimation;
      animation.frameRateStart = characterAnimation.attackAreaObject.frameRateStart!;
    }
  }

  private createAttackMeleeAreaAnimation(characterAnimation: ICharacterAnimation): void {
    if (
      characterAnimation.attackMeleeArea &&
      !this.scene.anims.exists(characterAnimation.attackMeleeArea.key)
    ) {
      const animation = this.scene.anims.create({
        key: characterAnimation.attackMeleeArea.key,
        frames: characterAnimation.attackMeleeArea.frames,
        frameRate: characterAnimation.attackMeleeArea.frameRate,
        repeat: characterAnimation.attackMeleeArea.repeat,
        yoyo: characterAnimation.attackMeleeArea.yoyo,
      }) as IAnimation;
      animation.frameRateStart = characterAnimation.attackMeleeArea.frameRateStart!;
    }
  }

  private createAttackMeleeAreaObjectAnimation(characterAnimation: ICharacterAnimation): void {
    if (
      characterAnimation.attackMeleeAreaObject &&
      !this.scene.anims.exists(characterAnimation.attackMeleeAreaObject.key)
    ) {
      const animation = this.scene.anims.create({
        key: characterAnimation.attackMeleeAreaObject.key,
        frames: characterAnimation.attackMeleeAreaObject.frames,
        frameRate: characterAnimation.attackMeleeAreaObject.frameRate,
        repeat: characterAnimation.attackMeleeAreaObject.repeat,
        yoyo: characterAnimation.attackMeleeAreaObject.yoyo,
      }) as IAnimation;
      animation.frameRateStart = characterAnimation.attackMeleeAreaObject.frameRateStart!;
    }
  }
}
