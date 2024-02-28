import { ICharacterModel } from '../interface/ICharacterModel';
import { IFrom, IReportLog, ITo } from '../interface/IReportLog';
import { IReport } from '../interface/IReport';

export class BattleReport {
  private report: IReport;

  public createReport(report: IReport): void {
    this.report = report;
  }

  public getPlayers(): ICharacterModel[] {
    return this.report.players;
  }

  public getEnemies(): ICharacterModel[] {
    return this.report.enemies;
  }

  public getReports(): IReportLog[] {
    return this.report.reports;
  }

  public filterReportToById(id: number): ITo | undefined {
    for (const report of this.report.reports) {
      if (report.to && report.to.id === id) {
        return report.to;
      } else if (report.toList) {
        const toListMatch = report.toList.find(to => to.id === id);
        if (toListMatch) {
          return toListMatch;
        }
      }
    }
    return undefined;
  }

  public filterReportFromById(id: number): IFrom | undefined {
    for (const report of this.report.reports) {
      if (report.from.id === id) {
        return report.from;
      }
    }
    return undefined;
  }
}
