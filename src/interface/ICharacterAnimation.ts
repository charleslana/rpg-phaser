import * as Phaser from 'phaser';

interface AnimationFrame {
  key: string;
  frames?: string | Phaser.Types.Animations.AnimationFrame[];
  frameRate?: number;
  frameRateStart?: number;
  repeat?: number;
  yoyo?: boolean;
}

interface AttackAnimationFrame extends AnimationFrame {
  isInitObject?: boolean;
  positionX?: number;
  positionY?: number;
}

interface AttackObjectAnimationFrame extends AnimationFrame {
  scale?: number;
  positionX?: number;
  positionY?: number;
}

export interface ICharacterAnimation {
  scaleX?: number;
  idle?: AnimationFrame;
  run?: AnimationFrame;
  attackMelee?: AnimationFrame;
  attackMeleeArea?: AttackAnimationFrame;
  attackMeleeAreaObject?: AttackObjectAnimationFrame;
  attackRanged?: AttackAnimationFrame;
  attackRangedObject?: AttackObjectAnimationFrame;
  attackArea?: AttackAnimationFrame;
  attackAreaObject?: AttackObjectAnimationFrame;
}
