/*Commons */
//HttpCode, HttpStatus Body
import { Controller, Get } from '@nestjs/common';

/*Features */
import { GetCompanyUseCase } from 'src/core/application/uses-cases/get/get-company.usecase';

@Controller('companies')
export class CompanyController {
  constructor(private getCompanyUseCase: GetCompanyUseCase) {}

  @Get('/adhesions')
  async getAdheredCompanies() {
    const companies = await this.getCompanyUseCase.getCompaniesByAdhesionDate();
    return companies;
  }

  @Get('/transfers')
  async getTransferringCompanies() {
    const companies =
      await this.getCompanyUseCase.getCompaniesLastMonthTransfers();
    return companies;
  }

  // @Post('/adhesion')
  // async registrarAdhesion(@Body() input: any) {
  //   // Llama a la lógica de negocio (el caso de uso).

  //   const nuevaEmpresa = await this.registrarEmpresaUseCase.addCompany(input);
  //   return nuevaEmpresa;
  // }
}
