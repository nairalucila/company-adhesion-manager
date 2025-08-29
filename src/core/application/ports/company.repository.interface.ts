import { Company } from 'src/core/domain/company.entity';

/**
 *Interface it's a port to define the repository.
 *
 * @export
 * @interface ICompanyRepository
 */
export interface ICompanyRepository {
  getAllCompanies(): Promise<Company[]>;
  addCompany(company: Company): Promise<Company[]>;
}
