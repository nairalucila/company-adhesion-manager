export enum CompanyType {
  Pyme = 'Pyme',
  Corporativa = 'Corporativa',
}

export class Company {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: CompanyType,
    public readonly adhesionDate: string,
    public readonly transferDates: string[],
  ) {}
}

//TODO: aclarar que se uso el tipo string para las fechas a modo piloto ya que los datos de obtienen de un json.
