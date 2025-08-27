import { CompanyEnum } from './company.interface';

export class Company {
  constructor(
    public id: string,
    public name: string,
    public type: CompanyEnum,
    public adhesionDate: string,
    public transferDates: string[],
  ) {}
}
