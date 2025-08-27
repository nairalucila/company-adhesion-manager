export interface ICompany {
  id: string;
  name: string;
  type: CompanyEnum;
  adhesionDate: string;
  transferDates: string[];
}

export enum CompanyEnum {
  Pyme = 'Pyme',
  Corporativa = 'Corporativa',
}

export interface ICompanyInput {
  id?: string;
  name: string;
  type: CompanyEnum;
  adhesionDate?: string;
  transferDates: string[];
}
