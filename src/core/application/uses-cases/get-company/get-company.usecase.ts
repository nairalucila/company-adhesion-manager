/*Commons */
import { Inject } from '@nestjs/common';

/*Features */
import type { ICompanyRepository } from '../../ports/company.repository.interface';
import { ICompany } from '../../../domain/company.interface';
import { getLastMonth } from '../utils/utils.usescases';

export class GetCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  /**
   * This method returns the companies that made transfers in the last month.
   *
   * @return {*}  {Promise<ICompany[]>}
   * @memberof GetCompanyUseCase
   */
  getCompaniesLastMonthTransfers = async (): Promise<ICompany[]> => {
    const data = await this.companyRepository.getAllCompanies();
    const lastMonth = getLastMonth();

    const companiesFiltered = data.filter((company) =>
      company.transferDates.some((date) => {
        const transferYearMonth = date.substring(0, 7);
        return transferYearMonth === lastMonth;
      }),
    );
    return companiesFiltered;
  };

  /**
   * This method returns the companies that was adhered in the last month.
   *
   * @return {*}  {Promise<ICompany[]>}
   * @memberof GetCompanyUseCase
   */
  getCompaniesByAdhesionDate = async (): Promise<ICompany[]> => {
    const data = await this.companyRepository.getAllCompanies();
    const lastMonth = getLastMonth();
    const companiesFiltered = data.filter((company) => {
      const adhesionLastMonth = company.adhesionDate.substring(0, 7);
      return adhesionLastMonth === lastMonth;
    });
    return companiesFiltered;
  };
}
