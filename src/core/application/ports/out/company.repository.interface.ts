import { Company } from 'src/core/domain/company.entity';

export interface ICompanyRepository {
  getCompaniesByLastMonthTransfers(): Promise<Company[]>;
  getCompaniesByAdhesionDate(): Promise<Company[]>;
  addCompany(company: Company): Promise<void>;
}
