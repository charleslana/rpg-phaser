import * as Phaser from 'phaser';
import { ICharacterModel } from '../interface/ICharacterModel';
import { IReport } from '../interface/IReport';

export class BattleReport {
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  private scene: Phaser.Scene;
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

  public start(): void {
    this.report.reports.forEach((_report, index) => {
      this.scene.time.delayedCall(1000 * index, () => {
        // eslint-disable-next-line no-console
        console.log(`Relatório ${index + 1} acionado após ${1000 * index} milissegundos`);
      });
    });
  }
}
