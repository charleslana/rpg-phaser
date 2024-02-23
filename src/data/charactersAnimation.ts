import { ICharacterAnimation } from '../interface/ICharacterAnimation';
import {
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
    frames: [
      { key: fireKnightIdle, frame: '1.png' },
      { key: fireKnightIdle, frame: '2.png' },
      { key: fireKnightIdle, frame: '3.png' },
      { key: fireKnightIdle, frame: '4.png' },
      { key: fireKnightIdle, frame: '5.png' },
      { key: fireKnightIdle, frame: '6.png' },
      { key: fireKnightIdle, frame: '7.png' },
      { key: fireKnightIdle, frame: '8.png' },
    ],
    frameRate: 10,
    frameRateStart: 10,
    repeat: -1,
  },
  run: {
    key: fireKnightRun,
    frames: [
      { key: fireKnightRun, frame: '1.png' },
      { key: fireKnightRun, frame: '2.png' },
      { key: fireKnightRun, frame: '3.png' },
      { key: fireKnightRun, frame: '4.png' },
      { key: fireKnightRun, frame: '5.png' },
      { key: fireKnightRun, frame: '6.png' },
      { key: fireKnightRun, frame: '7.png' },
      { key: fireKnightRun, frame: '8.png' },
    ],
    frameRate: 10,
    frameRateStart: 10,
    repeat: -1,
  },
  attackMelee: {
    key: fireKnightAttackMelee,
    frames: [
      { key: fireKnightAttackMelee, frame: '1.png' },
      { key: fireKnightAttackMelee, frame: '2.png' },
      { key: fireKnightAttackMelee, frame: '3.png' },
      { key: fireKnightAttackMelee, frame: '4.png' },
      { key: fireKnightAttackMelee, frame: '5.png' },
      { key: fireKnightAttackMelee, frame: '6.png' },
      { key: fireKnightAttackMelee, frame: '7.png' },
      { key: fireKnightAttackMelee, frame: '8.png' },
      { key: fireKnightAttackMelee, frame: '9.png' },
      { key: fireKnightAttackMelee, frame: '10.png' },
      { key: fireKnightAttackMelee, frame: '11.png' },
    ],
    frameRate: 11,
    frameRateStart: 11,
  },
};

export const characterRanger: ICharacterAnimation = {
  scaleX: 2,
  idle: {
    key: rangerIdle,
    frames: [
      { key: rangerIdle, frame: '1.png' },
      { key: rangerIdle, frame: '2.png' },
      { key: rangerIdle, frame: '3.png' },
      { key: rangerIdle, frame: '4.png' },
      { key: rangerIdle, frame: '5.png' },
      { key: rangerIdle, frame: '6.png' },
      { key: rangerIdle, frame: '7.png' },
      { key: rangerIdle, frame: '8.png' },
      { key: rangerIdle, frame: '9.png' },
      { key: rangerIdle, frame: '10.png' },
      { key: rangerIdle, frame: '11.png' },
      { key: rangerIdle, frame: '12.png' },
    ],
    frameRate: 7,
    frameRateStart: 7,
    repeat: -1,
  },
  attackRanged: {
    isInitObject: false,
    key: rangerAttackRanged,
    frames: [
      { key: rangerAttackRanged, frame: '1.png' },
      { key: rangerAttackRanged, frame: '2.png' },
      { key: rangerAttackRanged, frame: '3.png' },
      { key: rangerAttackRanged, frame: '4.png' },
      { key: rangerAttackRanged, frame: '5.png' },
      { key: rangerAttackRanged, frame: '6.png' },
      { key: rangerAttackRanged, frame: '7.png' },
      { key: rangerAttackRanged, frame: '8.png' },
      { key: rangerAttackRanged, frame: '9.png' },
      { key: rangerAttackRanged, frame: '10.png' },
      { key: rangerAttackRanged, frame: '11.png' },
    ],
    frameRate: 11,
    frameRateStart: 11,
  },
  attackRangedObject: {
    scale: 2,
    positionY: -65,
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
    frames: [
      { key: mageIdle, frame: '1.png' },
      { key: mageIdle, frame: '2.png' },
      { key: mageIdle, frame: '3.png' },
      { key: mageIdle, frame: '4.png' },
      { key: mageIdle, frame: '5.png' },
      { key: mageIdle, frame: '6.png' },
    ],
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
    positionX: 1000,
    positionY: 500,
    key: mageAttackAreaObject,
    frames: generateFrameNumbers(mageAttackAreaObject, 0, 81, 4, 'frame'),
    frameRate: 50,
    frameRateStart: 50,
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
