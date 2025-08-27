/*Commons */
import { Inject } from '@nestjs/common';

/*Features */
import type { ICompanyRepository } from '../../../../core/application/ports/company.repository.interface';
//import { Company } from 'src/core/domain/company.entity';

export class AddCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async addCompany(inputOrCompany: any): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = await this.companyRepository.addCompany(inputOrCompany);
    return result;
  }
}

//TODO: UN CASO DE USO POR FUNCION, YA QUE ESTO SERIA EL SERVICIO
/** getCompaniesByLastMonthTransfers(): Promise<Company[]>;
  getCompaniesByAdhesionDate(): Promise<Company[]>;
  addCompany(company: Company): Promise<void>; */
