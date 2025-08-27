/*Commons */
import { Inject } from '@nestjs/common';

/*Features */
import type { ICompanyRepository } from '../../ports/company.repository.interface';
import { ICompany } from 'src/core/domain/company.interface';
import { getLastMonth } from '../utils/utils.usescases';

export class GetCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  //Obtener las empresas que realizaron transferencias en el último mes.
  async getCompaniesLastMonthTransfers(): Promise<ICompany[]> {
    const data = await this.companyRepository.getAllCompanies();
    const lastMonth = getLastMonth();

    const companiesFiltered = data.filter((company) =>
      company.transferDates.some((date) => {
        const transferYearMonth = date.substring(0, 7);
        return transferYearMonth === lastMonth;
      }),
    );
    return companiesFiltered;
  }

  //Obtener las empresas que se adhirieron en el último mes.
  async getCompaniesByAdhesionDate(): Promise<ICompany[]> {
    try {
      const data = await this.companyRepository.getAllCompanies();
      const lastMonth = getLastMonth();
      const companiesFiltered = data.filter((company) => {
        const adhesionLastMonth = company.adhesionDate.substring(0, 7);
        return adhesionLastMonth === lastMonth;
      });
      return companiesFiltered;
    } catch (error) {
      console.log('Simulando un error de retorno en casos de usos', error);
      throw error;
    }
  }
}
