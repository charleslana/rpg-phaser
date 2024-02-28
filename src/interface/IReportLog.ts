import { CharacterSkillEnum } from '../enum/CharacterSkillEnum';

export interface IFrom {
  id: number;
  characterId: number;
  sp: number;
  maxSP: number;
  type: CharacterSkillEnum;
}

export interface ITo {
  id: number;
  characterId: number;
  damage?: number;
  hp: number;
  maxHP: number;
  sp?: number;
  critical?: boolean;
  dodge?: boolean;
}

export interface IReportLog {
  from: IFrom;
  to?: ITo;
  toList?: ITo[];
}
