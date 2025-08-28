import { Company } from '../../core/domain/company.entity';
import { ICompanyRepository } from '../../core/application/ports/company.repository.interface';
import { promises as fs } from 'fs';
import path from 'path';

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

      const companiesData = JSON.parse(fileContent) as Company[];

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

  async addCompany(company: Company): Promise<Company[]> {
    //TODO: Agregar logica para agregar una nueva empresa al array de empresas
    try {
      const getAllCompanies = await this.getAllCompanies();
      getAllCompanies.push(company);

      const updatedJson = JSON.stringify(getAllCompanies, null, 2);
      await fs.writeFile(this.filePath, updatedJson, 'utf8');
      const data = await this.getAllCompanies();
      //JSON.stringify(data);
      return data;
    } catch (error) {
      //TODO: agregar exception handler error
      console.log('Simulando un error de retorno');
      throw error; // Lanzar el error para cumplir con el tipo de retorno Promise<Company[]>
    }
  }
}
