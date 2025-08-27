/* eslint-disable @typescript-eslint/no-unused-vars */
import { Company } from 'src/core/domain/company.entity';
import { ICompanyRepository } from 'src/core/application/ports/company.repository.interface';
import { promises as fs } from 'fs';
import path from 'path';
import { CompanyEnum, ICompany } from 'src/core/domain/company.interface';

export class CompanyRepository implements ICompanyRepository {
  private readonly filePath: string = path.join(
    __dirname,
    '..',
    '..',
    'utils',
    'json-company-data.json',
  );

  async getAllCompanies(): Promise<Company[]> {
    try {
      const fileContent = await fs.readFile(this.filePath, 'utf-8');

      const companiesData = JSON.parse(fileContent) as ICompany[];

      return companiesData.map((data) => {
        return new Company(
          data.id,
          data.name,
          data.type,
          data.adhesionDate,
          data.transferDates,
        );
      });
    } catch (error) {
      //TODO: agregar exception handler error
      console.error('Error reading file:', error);
      throw error;
    }
  }

  async addCompany(company: Company): Promise<void> {
    try {
      return await fs.writeFile(
        this.filePath,
        JSON.stringify(company, null, 2),
      );
    } catch (error) {
      //TODO: agregar exception handler error
      console.log('Simulando un error de retorno');
    }
  }
}
