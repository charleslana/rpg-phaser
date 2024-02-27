import { ICharacterModel } from './ICharacterModel';
import { IReportLog } from './IReportLog';

export interface IReport {
  players: ICharacterModel[];
  enemies: ICharacterModel[];
  reports: IReportLog[];
}
