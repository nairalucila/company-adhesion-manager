import { Module } from '@nestjs/common';
import { CompanyController } from './adapter/company.controller';
import { GetCompanyUseCase } from './core/application/uses-cases/get/get-company.usecase';
import { CompanyRepository } from './infraestructure/persistance/company.repository';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [
    GetCompanyUseCase,
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
})
export class AppModule {}
