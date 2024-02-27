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
  reports: [
    {
      from: {
        id: 1,
        characterId: 1,
        sp: 25,
      },
      to: {
        id: 1,
        characterId: 1,
        damage: 25,
        hp: 75,
        hpMax: 100,
      },
    },
    {
      from: {
        id: 2,
        characterId: 2,
        sp: 10,
      },
      to: {
        id: 2,
        characterId: 2,
        damage: 15,
        hp: 85,
        hpMax: 100,
      },
    },
    {
      from: {
        id: 3,
        characterId: 3,
        sp: 10,
      },
      toList: [
        {
          id: 1,
          characterId: 1,
          damage: 50,
          hp: 25,
          hpMax: 100,
          critical: true,
        },
        {
          id: 2,
          characterId: 2,
          hp: 85,
          hpMax: 100,
          dodge: true,
        },
        {
          id: 3,
          characterId: 3,
          damage: 20,
          hp: 80,
          hpMax: 100,
        },
      ],
    },
  ],
};
