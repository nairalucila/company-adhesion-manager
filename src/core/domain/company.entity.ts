import { CompanyEnum } from './company.interface';

/**
 * This class represents a company.
 *
 * @export
 * @class Company
 */
export class Company {
  constructor(
    public id: string,
    public name: string,
    public type: CompanyEnum,
    public adhesionDate: string,
    public transferDates: string[],
  ) {}
}
