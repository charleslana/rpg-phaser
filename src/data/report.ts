import { CharacterSkillEnum } from '../enum/CharacterSkillEnum';
import { IReport } from '../interface/IReport';

export const report: IReport = {
  players: [
    {
      id: 1,
      character: {
        id: 1,
        name: 'Test',
      },
      hp: 100,
      sp: 0,
      slot: 1,
    },
    {
      id: 2,
      character: {
        id: 2,
        name: 'Test2',
      },
      hp: 100,
      sp: 0,
      slot: 2,
    },
    {
      id: 3,
      character: {
        id: 3,
        name: 'Test3',
      },
      hp: 100,
      sp: 0,
      slot: 3,
    },
  ],
  enemies: [
    {
      id: 4,
      character: {
        id: 1,
        name: 'Test',
      },
      hp: 100,
      sp: 0,
      slot: 1,
    },
    {
      id: 5,
      character: {
        id: 2,
        name: 'Test2',
      },
      hp: 100,
      sp: 0,
      slot: 2,
    },
    {
      id: 6,
      character: {
        id: 3,
        name: 'Test3',
      },
      hp: 100,
      sp: 0,
      slot: 3,
    },
  ],
  reports: [
    {
      id: 1,
      from: {
        id: 1,
        characterId: 1,
        sp: 25,
        maxSP: 100,
        type: CharacterSkillEnum.Melee,
      },
      to: {
        id: 5,
        characterId: 1,
        damage: 25,
        hp: 75,
        maxHP: 100,
      },
    },
    {
      id: 2,
      from: {
        id: 2,
        characterId: 2,
        sp: 10,
        maxSP: 100,
        type: CharacterSkillEnum.Ranged,
      },
      to: {
        id: 4,
        characterId: 2,
        damage: 15,
        hp: 85,
        maxHP: 100,
      },
    },
    {
      id: 3,
      from: {
        id: 3,
        characterId: 3,
        sp: 10,
        maxSP: 100,
        type: CharacterSkillEnum.Area,
      },
      toList: [
        {
          id: 4,
          characterId: 1,
          damage: 50,
          hp: 25,
          maxHP: 100,
          critical: true,
        },
        {
          id: 5,
          characterId: 2,
          hp: 85,
          maxHP: 100,
          dodge: true,
        },
        {
          id: 6,
          characterId: 3,
          damage: 20,
          hp: 80,
          maxHP: 100,
        },
      ],
    },
    {
      id: 4,
      from: {
        id: 1,
        characterId: 1,
        sp: 30,
        maxSP: 100,
        type: CharacterSkillEnum.MeleeArea,
      },
      toList: [
        {
          id: 4,
          characterId: 1,
          damage: 20,
          hp: 5,
          maxHP: 100,
          critical: true,
        },
        {
          id: 5,
          characterId: 2,
          damage: 40,
          hp: 45,
          maxHP: 100,
        },
        {
          id: 6,
          characterId: 3,
          hp: 80,
          maxHP: 100,
          dodge: true,
        },
      ],
    },
    {
      id: 5,
      from: {
        id: 5,
        characterId: 2,
        sp: 5,
        maxSP: 100,
        type: CharacterSkillEnum.Ranged,
      },
      to: {
        id: 1,
        characterId: 1,
        damage: 5,
        hp: 95,
        maxHP: 100,
      },
    },
    {
      id: 6,
      from: {
        id: 4,
        characterId: 1,
        sp: 10,
        maxSP: 100,
        type: CharacterSkillEnum.Melee,
      },
      to: {
        id: 3,
        characterId: 3,
        damage: 90,
        hp: 10,
        maxHP: 100,
        critical: true,
      },
    },
    {
      id: 7,
      from: {
        id: 6,
        characterId: 3,
        sp: 50,
        maxSP: 100,
        type: CharacterSkillEnum.Area,
      },
      toList: [
        {
          id: 1,
          characterId: 1,
          damage: 40,
          hp: 50,
          maxHP: 100,
        },
        {
          id: 2,
          characterId: 2,
          damage: 60,
          hp: 40,
          maxHP: 100,
          critical: true,
        },
        {
          id: 3,
          characterId: 3,
          hp: 10,
          maxHP: 100,
          dodge: true,
        },
      ],
    },
    {
      id: 8,
      from: {
        id: 4,
        characterId: 1,
        sp: 15,
        maxSP: 100,
        type: CharacterSkillEnum.MeleeArea,
      },
      toList: [
        {
          id: 1,
          characterId: 1,
          hp: 50,
          maxHP: 100,
          dodge: true,
        },
        {
          id: 2,
          characterId: 2,
          hp: 40,
          maxHP: 100,
          dodge: true,
        },
        {
          id: 3,
          characterId: 3,
          hp: 10,
          maxHP: 100,
          dodge: true,
        },
      ],
    },
  ],
};
