import * as Phaser from 'phaser';
import { ICharacterModel } from '../interface/ICharacterModel';
import { IReport } from '../interface/IReport';

export class BattleReport {
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  private scene: Phaser.Scene;
  private reports: IReport;

  public createReport(reports: IReport): void {
    this.reports = reports;
  }

  public getPlayers(): ICharacterModel[] {
    return this.reports.players;
  }

  public getEnemies(): ICharacterModel[] {
    return this.reports.enemies;
  }

  public start(): void {
    this.reports.reports.forEach((_report, index) => {
      this.scene.time.delayedCall(1000 * index, () => {
        // eslint-disable-next-line no-console
        console.log(`Relatório ${index + 1} acionado após ${1000 * index} milissegundos`);
      });
    });
  }
}
