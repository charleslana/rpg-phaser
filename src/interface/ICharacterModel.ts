import { ICharacter } from './ICharacter';

export interface ICharacterModel {
  id: number;
  hp: number;
  sp: number;
  slot: number;
  character: ICharacter;
}
