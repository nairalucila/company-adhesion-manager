/*Commons */
//HttpCode, HttpStatus Body
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

/*Features */
import { GetCompanyUseCase } from 'src/core/application/uses-cases/get/get-company.usecase';
import { AddCompanyUseCase } from 'src/core/application/uses-cases/post/add-company.usecase';
import type {
  ICompanyInput,
  ICompany,
} from 'src/core/domain/company.interface';

@Controller('companies')
export class CompanyController {
  constructor(
    private getCompanyUseCase: GetCompanyUseCase,
    private addCompanyUseCase: AddCompanyUseCase,
  ) {}

  @Get('/adhesions')
  async getAdheredCompanies(): Promise<ICompany[]> {
    const companies = await this.getCompanyUseCase.getCompaniesByAdhesionDate();
    return companies;
  }

  @Get('/transfers')
  async getTransferringCompanies(): Promise<ICompany[]> {
    const companies =
      await this.getCompanyUseCase.getCompaniesLastMonthTransfers();
    return companies;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/adhesion')
  async addCompany(@Body() input: ICompanyInput) {
    const data = await this.addCompanyUseCase.addCompany(input);
    return data;
  }
}
