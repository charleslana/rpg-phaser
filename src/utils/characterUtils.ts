import { characterFireKnight, characterRanger } from '../data/charactersAnimation';
import { ICharacterAnimation } from '../interface/ICharacterAnimation';

export function getCharacterAnimation(characterId: number): ICharacterAnimation {
  switch (characterId) {
    case 1:
      return characterFireKnight;
    case 2:
      return characterRanger;
    default:
      return characterFireKnight;
  }
}
