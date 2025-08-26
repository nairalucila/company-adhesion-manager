import { Inject } from '@nestjs/common';
import type { ICompanyRepository } from '../ports/out/company.repository.interface';

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
