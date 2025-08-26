// export interface Company {
//   id: string;
//   name: string;
//   type: string;
//   adhesionDate: string;
//   transferDates: string[];
// }

//TODO: aclarar que se uso el tipo string para las fechas a modo piloto ya que los datos de obtienen de un json.
export class Company {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly tipo: 'Pyme' | 'Corporativa',
    public readonly fechaAdhesion: string,
    public readonly fechasTransferencias: string[] = [],
  ) {}
}
