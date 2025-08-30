/*Commons */
import { Inject } from '@nestjs/common';

/*Features */
import type { ICompanyRepository } from '../../../../core/application/ports/company.repository.interface';
import { Company } from '../../../../core/domain/company.entity';
import { ICompanyInput } from '../../../../core/domain/company.interface';

/*Utils */
import { generateId } from '../utils/utils.usescases';

export class AddCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  /**
   * This method adds a company to the repository.
   *
   * @param {ICompanyInput} input
   * @return {*}  {Promise<Company[]>}
   * @memberof AddCompanyUseCase
   */
  addCompany = async (input: ICompanyInput): Promise<Company[]> => {
    const id = generateId();
    input.id = id;
    if (!input.adhesionDate) {
      input.adhesionDate = new Date().toISOString();
    }
    const company = new Company(
      input.id,
      input.name,
      input.type,
      input.adhesionDate,
      input.transferDates,
    );
    const result = await this.companyRepository.addCompany(company);
    return result;
  };
}
