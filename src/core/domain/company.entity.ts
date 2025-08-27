import { CompanyEnum } from './company.interface';

export class Company {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: CompanyEnum,
    public readonly adhesionDate: string,
    public readonly transferDates: string[],
  ) {}
}
