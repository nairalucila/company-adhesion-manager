export enum CompanyType {
  Corporative = 'Corporative',
  Pyme = 'Pyme',
}

export interface ICompany {
  id: string;
  name: string;
  type: CompanyType;
  adhesionDate: string;
  transferDates: string[];
}
