/* eslint-disable @typescript-eslint/require-await */
import { ICompany } from '../types/company.types';
import { IDatabase } from './database.interface';

export class MemoryDatabase implements IDatabase {
  private companies: Map<string, ICompany> = new Map();

  async saveCompany(company: ICompany): Promise<ICompany> {
    this.companies.set(company.id, company);
    return company;
  }

  async getCompany(id: string): Promise<ICompany | null> {
    return this.companies.get(id) || null;
  }
}

export const memoryDatabase = new MemoryDatabase();
