import { ICompany } from '../types/company.types';

export interface IDatabase {
  saveCompany(company: ICompany): Promise<ICompany>;
  getCompany(id: string): Promise<ICompany | null>;
}
