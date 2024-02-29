import * as Phaser from 'phaser';
import { battleBackground1 } from '../data/assetKeys';
import { BattleReport } from '../battle/BattleReport';
import { battleSceneKey, homeSceneKey } from '../data/sceneKeys';
import { Character } from '../battle/Character';
import { CharacterSkillEnum } from '../enum/CharacterSkillEnum';
import { FinalDialog } from '../battle/FinalDialog';
import { IReportLog, ITo } from '../interface/IReportLog';
import { report } from '../data/report';
import { Slot } from '../battle/Slot';
import { SpeedButton } from '../battle/SpeedButton';

export class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: battleSceneKey });
  }

  private battleReport: BattleReport;
  private players: Character[] = [];
  private enemies: Character[] = [];
  private speed = 1;
  private speedButton: SpeedButton;
  private finalDialog: FinalDialog;

  preload(): void {
    this.setBackgroundImage();
    this.createLayout();
  }

  create(): void {
    this.createBattleReport();
    this.createPlayers();
    this.createEnemies();
    this.createSpeedButton();
    this.createSlots();
  }

  private setBackgroundImage(): void {
    this.cameras.main.setBackgroundColor('#ffffff');
    const backgroundImage = this.add.image(0, 0, battleBackground1).setOrigin(0, 0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  private createLayout(): void {
    this.add.text(100, 100, 'Cena 2 - Pressione tecla delete para voltar para a cena anterior', {
      backgroundColor: '#ffffff',
      color: '#000000',
    });
    this.input.keyboard!.on('keydown-DELETE', () => {
      this.scene.start(homeSceneKey);
    });
    this.input.keyboard!.on('keydown-S', () => {
      this.start();
    });
    this.input.keyboard!.on('keydown-R', () => {
      this.scene.restart();
    });
  }

  private createSpeedButton(): void {
    this.speedButton = new SpeedButton(this);
    this.speed = this.speedButton.getSpeed();
    this.updateCharactersSpeed();
    this.speedButton.on(this.speedButton.event, this.changeSpeed, this);
  }

  private changeSpeed(): void {
    this.speed += 0.5;
    if (this.speed > 2) {
      this.speed = 1;
    }
    this.updateCharactersSpeed();
    this.speedButton.changeText(this.speed.toString());
  }

  private updateCharactersSpeed(): void {
    this.players.forEach(player => {
      player.updateAnimationSpeed(this.speed);
    });
    this.enemies.forEach(enemy => {
      enemy.updateAnimationSpeed(this.speed);
    });
  }

  private createBattleReport(): void {
    this.battleReport = new BattleReport();
    this.battleReport.createReport(report);
  }

  private createPlayers(): void {
    this.players = [];
    this.battleReport.getPlayers().forEach(player => {
      const character = new Character(this, 0, 0);
      character.createCharacter({
        id: player.id,
        characterId: player.character.id,
        slot: player.slot,
      });
      this.players.push(character);
    });
  }

  private createEnemies(): void {
    this.enemies = [];
    this.battleReport.getEnemies().forEach(enemy => {
      const character = new Character(this, 0, 0);
      character.createCharacter({
        id: enemy.id,
        characterId: enemy.character.id,
        slot: enemy.slot,
        isFlip: true,
      });
      this.enemies.push(character);
    });
  }

  private async start(): Promise<void> {
    const reports = this.battleReport.getReports();
    for (const report of reports) {
      await this.handleReport(report);
    }
    this.showDialog();
  }

  private async handleReport(report: IReportLog): Promise<void> {
    switch (report.from.type) {
      case CharacterSkillEnum.Melee:
        await this.getActionMelee(report);
        break;
      case CharacterSkillEnum.Ranged:
        await this.getActionRanged(report);
        break;
      case CharacterSkillEnum.Area:
        await this.getActionArea(report);
        break;
      case CharacterSkillEnum.MeleeArea:
        await this.getActionMeleeArea(report);
        break;
      default:
        break;
    }
  }

  private async getActionMelee(report: IReportLog): Promise<void> {
    await this.moveTo(
      this.findPlayerById(report.from.id),
      this.findEnemyById(report.to!.id),
      report.id
    );
  }

  private async getActionRanged(report: IReportLog): Promise<void> {
    await this.moveObjectTo(
      this.findPlayerById(report.from.id),
      this.findEnemyById(report.to!.id),
      report.id
    );
  }

  private async getActionArea(report: IReportLog): Promise<void> {
    await this.attackArea(
      this.findPlayerById(report.from.id),
      this.filterEnemiesById(report.from.id),
      report.id
    );
  }

  private async getActionMeleeArea(report: IReportLog): Promise<void> {
    await this.attackMeleeArea(
      this.findPlayerById(report.from.id),
      this.filterEnemiesById(report.from.id),
      report.id
    );
  }

  private findPlayerById(id: number): Character {
    const player = this.players.find(player => player.id === id);
    if (player) {
      return player;
    } else {
      return this.enemies.find(enemy => enemy.id === id)!;
    }
  }

  private findEnemyById(id: number): Character {
    const enemy = this.enemies.find(enemy => enemy.id === id);
    if (enemy) {
      return enemy;
    } else {
      return this.players.find(player => player.id === id)!;
    }
  }

  private filterEnemiesById(id: number): Character[] {
    const players = this.players.filter(player => player.id === id);
    if (players.length > 0) {
      return this.enemies;
    } else {
      return this.players;
    }
  }

  private async sleep(ms: number): Promise<number> {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

  private getMsWithSpeed(time: number): number {
    return time / this.speed;
  }

  private async moveTo(from: Character, to: Character, reportId: number): Promise<number> {
    const reportTo = this.battleReport.filterReportToById(to.id, reportId)!;
    return new Promise(resolve => {
      from.statusBar.hide();
      from.changeRunAnimation(this.speed);
      const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
        targets: from.sprite,
        x: from.isFlip ? to.x - to.width * 2 : to.x + to.width * 2,
        y: to.y,
        duration: this.getMsWithSpeed(500),
        onComplete: () => {
          const duration = from.changeAttackMeleeAnimation(this.speed);
          from.sprite.setDepth(2);
          this.time.delayedCall(this.getMsWithSpeed(duration), async () => {
            this.handleAttackTo(reportTo, to);
            from.changeRunAnimation(this.speed);
            from.sprite.toggleFlipX();
            await this.fromReturnToStartPosition(from, reportId);
            await this.sleep(this.getMsWithSpeed(250));
            resolve(tweenConfig.duration!);
          });
        },
      };
      this.tweens.add(tweenConfig);
    });
  }

  private handleAttackTo(reportTo: ITo, to: Character): void {
    if (!reportTo.dodge) {
      to.blinkSprite(this.speed);
      to.statusBar.updateHPWithAnimation(reportTo.hp, reportTo.maxHP, this.speed);
      to.damage.changeDamageText(`-${reportTo.damage}`, this.speed);
      if (reportTo.critical) {
        to.damage.enableCriticalText(this.speed);
      }
      return;
    }
    to.damage.enableDodgeText(this.speed);
  }

  private async fromReturnToStartPosition(from: Character, reportId: number): Promise<number> {
    const reportFrom = this.battleReport.filterReportFromById(from.id, reportId)!;
    return new Promise(resolve => {
      const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
        targets: from.sprite,
        x: from.x,
        y: from.y,
        duration: this.getMsWithSpeed(500),
        onComplete: () => {
          from.sprite.depth--;
          from.sprite.toggleFlipX();
          from.changeIdleAnimation(this.speed);
          from.statusBar.show();
          from.statusBar.updateSPWithAnimation(reportFrom.sp, reportFrom.maxSP, this.speed);
          resolve(tweenConfig.duration!);
        },
      };
      this.tweens.add(tweenConfig);
    });
  }

  private async moveObjectTo(from: Character, to: Character, reportId: number): Promise<number> {
    const reportTo = this.battleReport.filterReportToById(to.id, reportId)!;
    return new Promise(resolve => {
      from.statusBar.hide();
      const duration = from.changeAttackRangedAnimation(this.speed);
      if (from.characterAnimation.attackRanged!.isInitObject) {
        from.enableAttackRangedObjectAnimation(this.speed);
      }
      this.time.delayedCall(this.getMsWithSpeed(duration), () => {
        if (!from.characterAnimation.attackRanged!.isInitObject) {
          from.enableAttackRangedObjectAnimation(this.speed);
        }
        from.changeIdleAnimation(this.speed);
        from.statusBar.show();
        const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
          targets: from.spriteObject,
          x: from.isFlip ? to.x - to.width * 2 : to.x + to.width * 2,
          y: to.y,
          duration: this.getMsWithSpeed(500),
          onComplete: async () => {
            from.spriteObject.setDepth(2);
            this.handleAttackTo(reportTo, to);
            from.spriteObject.destroy();
            const reportFrom = this.battleReport.filterReportFromById(from.id, reportId)!;
            from.statusBar.updateSPWithAnimation(reportFrom.sp, reportFrom.maxSP, this.speed);
            await this.sleep(this.getMsWithSpeed(250));
            resolve(tweenConfig.duration!);
          },
        };
        this.tweens.add(tweenConfig);
      });
    });
  }

  private async attackArea(
    from: Character,
    toList: Character[],
    reportId: number
  ): Promise<number> {
    return new Promise<number>(resolve => {
      from.statusBar.hide();
      const duration = from.changeAttackAreaAnimation(this.speed);
      if (from.characterAnimation.attackArea!.isInitObject) {
        from.enableAttackAreaObjectAnimation(this.speed);
        from.spriteObject.setDepth(2);
      }
      this.time.delayedCall(this.getMsWithSpeed(duration), () => {
        let durationArea = 0;
        if (!from.characterAnimation.attackArea!.isInitObject) {
          durationArea = from.enableAttackAreaObjectAnimation(this.speed);
          from.spriteObject.setDepth(2);
        }
        from.changeIdleAnimation(this.speed);
        from.statusBar.show();
        this.time.delayedCall(this.getMsWithSpeed(durationArea), async () => {
          toList.forEach(to => {
            const reportTo = this.battleReport.filterReportToById(to.id, reportId)!;
            this.handleAttackTo(reportTo, to);
          });
          from.spriteObject.destroy();
          const reportFrom = this.battleReport.filterReportFromById(from.id, reportId)!;
          from.statusBar.updateSPWithAnimation(reportFrom.sp, reportFrom.maxSP, this.speed);
          await this.sleep(this.getMsWithSpeed(250));
          resolve(this.getMsWithSpeed(durationArea));
        });
      });
    });
  }

  private async attackMeleeArea(
    from: Character,
    toList: Character[],
    reportId: number
  ): Promise<number> {
    return new Promise<number>(resolve => {
      from.statusBar.hide();
      from.changeRunAnimation(this.speed);
      const distanceFromRightEdge = from.characterAnimation.attackMeleeArea!.positionX!;
      const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
        targets: from.sprite,
        x: !from.isFlip ? this.cameras.main.width - distanceFromRightEdge : distanceFromRightEdge,
        y: from.characterAnimation.attackMeleeArea!.positionY!,
        duration: this.getMsWithSpeed(500),
        onComplete: () => {
          const duration = from.changeAttackMeleeAreaAnimation(this.speed);
          if (from.characterAnimation.attackMeleeArea!.isInitObject) {
            from.enableAttackMeleeAreaObjectAnimation(this.speed);
            from.sprite.setDepth(2);
          }
          this.time.delayedCall(this.getMsWithSpeed(duration), () => {
            let durationArea = 0;
            if (!from.characterAnimation.attackMeleeArea!.isInitObject) {
              durationArea = from.enableAttackMeleeAreaObjectAnimation(this.speed);
              from.sprite.setDepth(2);
            }
            this.time.delayedCall(this.getMsWithSpeed(durationArea), async () => {
              toList.forEach(to => {
                const reportTo = this.battleReport.filterReportToById(to.id, reportId)!;
                this.handleAttackTo(reportTo, to);
              });
              from.changeRunAnimation(this.speed);
              from.sprite.toggleFlipX();
              from.spriteObject.destroy();
              await this.fromReturnToStartPosition(from, reportId);
              await this.sleep(this.getMsWithSpeed(250));
              resolve(tweenConfig.duration!);
            });
          });
        },
      };
      this.tweens.add(tweenConfig);
    });
  }

  private createSlots(): void {
    const slot = new Slot(this);
    slot.setPlayers(this.players);
    slot.setEnemies(this.enemies);
  }

  private showDialog(): void {
    this.finalDialog = new FinalDialog(this);
    this.finalDialog.on(this.finalDialog.event, this.restart, this);
  }

  private restart(): void {
    this.scene.restart();
  }
}
