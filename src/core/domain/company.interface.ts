/**
 *Interface to define the object returned.
 *
 * @interface ICompany
 */
export interface ICompany {
  id: string;
  name: string;
  type: CompanyEnum;
  adhesionDate: string;
  transferDates: string[];
}

/**
 *Enum to define the type of company.
 *
 * @enum {string}
 */
export enum CompanyEnum {
  Pyme = 'Pyme',
  Corporativa = 'Corporativa',
}

/**
 *Interface to define the object received by the client.
 *
 * @interface ICompanyInput
 */
export interface ICompanyInput {
  id?: string;
  name: string;
  type: CompanyEnum;
  adhesionDate?: string;
  transferDates: string[];
}
