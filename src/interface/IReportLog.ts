interface IFrom {
  id: number;
  characterId: number;
  sp: number;
}

interface ITo {
  id: number;
  characterId: number;
  damage?: number;
  hp: number;
  hpMax: number;
  sp?: number;
  critical?: boolean;
  dodge?: boolean;
}

export interface IReportLog {
  from: IFrom;
  to?: ITo;
  toList?: ITo[];
}
