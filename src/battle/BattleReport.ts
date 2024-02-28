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

  public filterReportToById(id: number, reportId: number): ITo | undefined {
    const report = this.report.reports.find(r => r.id === reportId);
    if (!report) return undefined;
    if (report.to && report.to.id === id) {
      return report.to;
    } else if (report.toList) {
      return report.toList.find(to => to.id === id);
    }
    return undefined;
  }

  public filterReportFromById(id: number, reportId: number): IFrom | undefined {
    return this.report.reports.find(r => r.id === reportId && r.from.id === id)?.from;
  }
}
