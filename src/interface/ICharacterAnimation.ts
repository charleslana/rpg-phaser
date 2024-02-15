import * as Phaser from 'phaser';

interface AnimationFrame {
  key: string;
  frames?: string | Phaser.Types.Animations.AnimationFrame[];
  frameRate?: number;
  frameRateStart?: number;
  repeat?: number;
  yoyo?: boolean;
}

interface AttackRangedAnimationFrame extends AnimationFrame {
  isInitObject?: boolean;
}

interface AttackRangedObjectAnimationFrame extends AnimationFrame {
  scale?: number;
  positionX?: number;
  positionY?: number;
}

export interface ICharacterAnimation {
  scaleX?: number;
  idle?: AnimationFrame;
  run?: AnimationFrame;
  attackMelee?: AnimationFrame;
  attackRanged?: AttackRangedAnimationFrame;
  attackRangedObject?: AttackRangedObjectAnimationFrame;
}
