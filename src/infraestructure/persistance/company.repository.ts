/* eslint-disable @typescript-eslint/no-unused-vars */
import { Company } from 'src/core/domain/company.entity';
import { ICompanyRepository } from 'src/core/application/ports/out/company.repository.interface';
import { promises as fs } from 'fs';
import path from 'path';
import { CompanyType } from 'src/core/domain/company.entity';

//TODO: Recordar eliminar los disables de Eslint.
export class CompanyRepository implements ICompanyRepository {
  private readonly filePath: string = path.join(
    __dirname,
    'utils',
    'json-company-data.json',
  );

  async getCompaniesByLastMonthTransfers(): Promise<Company[]> {
    //TODO: Añadir metetodo para leer los files.
    // - Falta agregar el servicio para que filtre por mes.
    const empresa = new Company(
      '5',
      'Mate.io.',
      CompanyType.Pyme,
      '2024-07-15T10:00:00Z',
      ['2025-03-20T11:30:00Z'],
    );

    return Promise.resolve([empresa]);
  }

  async getCompaniesByAdhesionDate(): Promise<Company[]> {
    //TODO: COMPLETAR ESTO
    const empresa = new Company(
      '5',
      'Mate.io.',
      CompanyType.Pyme,
      '2024-07-15T10:00:00Z',
      ['2025-03-20T11:30:00Z'],
    );

    return Promise.resolve([empresa]);
  }

  async addCompany(company: Company): Promise<void> {
    //TODO:esto es simulado
    const empresa = new Company(
      '7',
      'Simulador.io.',
      CompanyType.Corporativa,
      '2024-07-15T10:00:00Z',
      ['2025-03-20T11:30:00Z'],
    );

    const emp = await fs.writeFile(
      this.filePath,
      JSON.stringify(empresa, null, 2),
    );

    return;
  }
}
