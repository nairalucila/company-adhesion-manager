import { Module } from '@nestjs/common';
import { CompanyController } from './client/company.controller';
import { AddCompanyUseCase } from './core/application/uses-cases/add-company.usecase';
import { CompanyRepository } from './infraestructure/persistance/company.repository';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [
    AddCompanyUseCase,
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
})
export class AppModule {}
