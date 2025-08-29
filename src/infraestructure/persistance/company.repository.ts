/*Dependencies  */
import { promises as fs } from 'fs';
import path from 'path';

/*Features */
import { Company } from '../../core/domain/company.entity';
import { ICompanyRepository } from '../../core/application/ports/company.repository.interface';

/**
 * This class implements the ICompanyRepository interface.
 *
 * @export
 * @class CompanyRepository
 * @implements {ICompanyRepository}
 */
export class CompanyRepository implements ICompanyRepository {
  private readonly filePath: string = path.join(
    __dirname,
    '..',
    '..',
    'utils',
    'json-company-data.json',
  );

  /**
   * This method returns all companies.
   *
   * @return {*}  {Promise<Company[]>}
   * @memberof CompanyRepository
   */
  getAllCompanies = async (): Promise<Company[]> => {
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
    } catch (error: unknown) {
      //TODO: agregar exception handler error
      console.error('Error reading file:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Unknown error reading companies file',
      );
    }
  };

  /**
   * This method adds a company to the repository.
   *
   * @param {Company} company
   * @return {*}  {Promise<Company[]>}
   * @memberof CompanyRepository
   */
  addCompany = async (company: Company): Promise<Company[]> => {
    try {
      const getAllCompanies = await this.getAllCompanies();
      getAllCompanies.push(company);

      const updatedJson = JSON.stringify(getAllCompanies, null, 2);
      await fs.writeFile(this.filePath, updatedJson, 'utf8');
      const data = await this.getAllCompanies();
      return data;
    } catch (error: unknown) {
      //TODO: agregar exception handler error
      console.log('Simulando un error de retorno');
      throw new Error(
        error instanceof Error ? error.message : 'Unknown error adding company',
      );
    }
  };
}
