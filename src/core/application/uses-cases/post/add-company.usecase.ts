/*Commons */
import { Inject } from '@nestjs/common';

/*Features */
import type { ICompanyRepository } from '../../../../core/application/ports/company.repository.interface';
import { Company } from 'src/core/domain/company.entity';
import { ICompanyInput } from 'src/core/domain/company.interface';

/*Utils */
import { generateId } from '../utils/utils.usescases';

export class AddCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async addCompany(input: ICompanyInput): Promise<void> {
    try {
      const id = generateId();
      input.id = id;
      input.adhesionDate = new Date().toISOString();
      const company = new Company(
        input.id,
        input.name,
        input.type,
        input.adhesionDate,
        input.transferDates,
      );
      const result = await this.companyRepository.addCompany(company);
      return result;
    } catch (error) {
      console.log('Error to add company', error);
      throw error;
    }
  }
}
