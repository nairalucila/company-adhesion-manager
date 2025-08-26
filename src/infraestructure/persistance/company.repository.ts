/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Company } from 'src/core/domain/company.entity';
import { ICompanyRepository } from 'src/core/application/ports/out/company.repository.interface';

export class CompanyRepository implements ICompanyRepository {
  //TODO: Recordar eliminar los disables de Eslint.

  async getCompaniesByLastMonthTransfers(): Promise<Company[]> {
    // Lógica para leer el JSON y convertirlo en objetos Empresa
    return [];
  }

  async getCompaniesByAdhesionDate(): Promise<Company[]> {
    return [];
  }

  async addCompany(company: Company): Promise<void> {
    return;
  }
}
