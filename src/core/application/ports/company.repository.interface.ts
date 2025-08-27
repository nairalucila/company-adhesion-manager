import { Company } from 'src/core/domain/company.entity';

export interface ICompanyRepository {
  getAllCompanies(): Promise<Company[]>;
  addCompany(company: Company): Promise<void>;
}
