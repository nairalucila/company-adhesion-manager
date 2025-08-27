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

  //TODO: separar la funcion de fecha como un util
  //Obtener las empresas que se adhirieron en el último mes.
  async getCompaniesByAdhesionDate(): Promise<ICompany[]> {
    try {
      const data = await this.companyRepository.getAllCompanies();
      const lastMonth = getLastMonth();

      return data.filter((company) => company.adhesionDate > lastMonth);
    } catch (error) {
      console.log('Simulando un error de retorno en casos de usos', error);
      throw error;
    }
  }
}
