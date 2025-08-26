import { Body, Controller, Post } from '@nestjs/common';
import { AddCompanyUseCase } from 'src/core/application/uses-cases/add-company.usecase';
// Este es el "servidor", el punto de entrada que recibe las peticiones.
@Controller('empresas')
export class CompanyController {
  constructor(private readonly registrarEmpresaUseCase: AddCompanyUseCase) {}

  @Post('/adhesion')
  async registrarAdhesion(@Body() input: any) {
    // Llama a la lógica de negocio (el caso de uso).

    const nuevaEmpresa = await this.registrarEmpresaUseCase.addCompany(input);
    return nuevaEmpresa;
  }
}
