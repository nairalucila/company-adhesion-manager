import { Module } from '@nestjs/common';
import { CompanyController } from './adapter/company.controller';
import { GetCompanyUseCase } from './core/application/uses-cases/get/get-company.usecase';
import { CompanyRepository } from './infraestructure/persistance/company.repository';
import { AddCompanyUseCase } from './core/application/uses-cases/post/add-company.usecase';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [
    GetCompanyUseCase,
    AddCompanyUseCase,
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
})
export class AppModule {}
