/*Commons */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

/*Features */
import { GetCompanyUseCase } from '../core/application/uses-cases/get-company/get-company.usecase';
import { AddCompanyUseCase } from '../core/application/uses-cases/add-company/add-company.usecase';
import type { ICompanyInput, ICompany } from '../core/domain/company.interface';

/**
 * The controller is the entry point for the application.
 * @class CompanyController
 */
@Controller('companies')
export class CompanyController {
  constructor(
    private getCompanyUseCase: GetCompanyUseCase,
    private addCompanyUseCase: AddCompanyUseCase,
  ) {}

  /**
   * This method returns the companies that was adhered in the last month.
   *
   * @return {*}  {Promise<ICompany[]>}
   * @memberof CompanyController
   */
  @Get('/adhesions')
  async getAdheredCompanies(): Promise<ICompany[]> {
    const companies = await this.getCompanyUseCase.getCompaniesByAdhesionDate();
    return companies;
  }

  /**
   * This method returns the companies that made transfers in the last month.
   *
   * @return {*}  {Promise<ICompany[]>}
   * @memberof CompanyController
   */
  @Get('/transfers')
  async getTransferringCompanies(): Promise<ICompany[]> {
    const companies =
      await this.getCompanyUseCase.getCompaniesLastMonthTransfers();
    return companies;
  }

  /**
   *This method add a new company to the list and returns the list.
   *
   * @param {ICompanyInput} input
   * @return {*}  {Promise<ICompany[]>}
   * @memberof CompanyController
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('/adhesion')
  async addCompany(@Body() input: ICompanyInput): Promise<ICompany[]> {
    const data = await this.addCompanyUseCase.addCompany(input);
    return data;
  }
}
