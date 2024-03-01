import { ICharacterAnimation } from '../interface/ICharacterAnimation';
import {
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
} from './assetKeys';

export const characterFireKnight: ICharacterAnimation = {
  scaleX: 2,
  idle: {
    key: fireKnightIdle,
    frames: generateFrameNumbers(fireKnightIdle, 1, 8),
    frameRate: 10,
    frameRateStart: 10,
    repeat: -1,
  },
  run: {
    key: fireKnightRun,
    frames: generateFrameNumbers(fireKnightRun, 1, 8),
    frameRate: 10,
    frameRateStart: 10,
    repeat: -1,
  },
  attackMelee: {
    key: fireKnightAttackMelee,
    frames: generateFrameNumbers(fireKnightAttackMelee, 1, 11),
    frameRate: 11,
    frameRateStart: 11,
  },
  attackMeleeArea: {
    positionX: 360,
    positionY: 390,
    key: fireKnightAttackArea,
    frames: generateFrameNumbers(fireKnightAttackArea, 1, 18),
    frameRate: 11,
    frameRateStart: 11,
  },
  attackMeleeAreaObject: {
    scale: 4.5,
    positionX: 125,
    positionY: 480,
    key: fireKnightAttackAreaObject,
    frames: generateFrameNumbers(fireKnightAttackAreaObject, 1, 3),
    frameRate: 10,
    frameRateStart: 10,
  },
};

export const characterRanger: ICharacterAnimation = {
  scaleX: 2,
  idle: {
    key: rangerIdle,
    frames: generateFrameNumbers(rangerIdle, 1, 12),
    frameRate: 7,
    frameRateStart: 7,
    repeat: -1,
  },
  attackRanged: {
    isInitObject: false,
    key: rangerAttackRanged,
    frames: generateFrameNumbers(rangerAttackRanged, 1, 11),
    frameRate: 11,
    frameRateStart: 11,
  },
  attackRangedObject: {
    scale: 2,
    positionY: -65,
    positionX: 65,
    key: rangerAttackRangedObject,
    frames: [{ key: rangerAttackRangedObject, frame: 'arrow_.png' }],
    frameRate: 1,
    frameRateStart: 1,
  },
};

export const characterMage: ICharacterAnimation = {
  scaleX: 1.2,
  idle: {
    key: mageIdle,
    frames: generateFrameNumbers(mageIdle, 1, 6),
    frameRate: 7,
    frameRateStart: 7,
    repeat: -1,
  },
  attackArea: {
    key: mageAttackArea,
    frames: generateFrameNumbers(mageAttackArea, 1, 8),
    frameRate: 10,
    frameRateStart: 10,
  },
  attackAreaObject: {
    scale: 3.5,
    positionX: 25,
    positionY: 500,
    key: mageAttackAreaObject,
    frames: generateFrameNumbers(mageAttackAreaObject, 0, 81, 4, 'frame'),
    frameRate: 60,
    frameRateStart: 60,
  },
};

function generateFrameNumbers(key: string, start: number, end: number, zeroPad = 0, text = '') {
  const frames = [];
  for (let i = start; i <= end; i++) {
    const frame = `${text}${i.toString().padStart(zeroPad, '0')}.png`;
    frames.push({ key, frame });
  }
  return frames;
}
