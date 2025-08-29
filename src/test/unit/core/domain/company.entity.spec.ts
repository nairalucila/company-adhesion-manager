import { Company } from '../../../../core/domain/company.entity';
import { CompanyEnum } from '../../../../core/domain/company.interface';

describe('Company Entity', () => {
  describe('Constructor', () => {
    it('should create a company instance with all properties', () => {
      const id = '1';
      const name = 'Test Company';
      const type = CompanyEnum.Pyme;
      const adhesionDate = '2025-08-01T10:00:00.000Z';
      const transferDates = ['2025-08-15T14:30:00.000Z'];

      const company = new Company(id, name, type, adhesionDate, transferDates);

      expect(company).toBeDefined();
      expect(company).toBeInstanceOf(Company);
      expect(company.id).toBe(id);
      expect(company.name).toBe(name);
      expect(company.type).toBe(type);
      expect(company.adhesionDate).toBe(adhesionDate);
      expect(company.transferDates).toBe(transferDates);
      expect(company.transferDates.length).toBe(1);
    });

    it('should create a company with Pyme type', () => {
      const company = new Company(
        '2',
        'Pyme Company',
        CompanyEnum.Pyme,
        '2025-07-15T08:00:00.000Z',
        [],
      );

      expect(company.type).toBe(CompanyEnum.Pyme);
      expect(company.type).toBe('Pyme');
    });

    it('should create a company with Corporativa type', () => {
      const company = new Company(
        '3',
        'Corporate Company',
        CompanyEnum.Corporativa,
        '2025-06-10T09:00:00.000Z',
        ['2025-06-15T11:20:00.000Z', '2025-07-01T13:45:00.000Z'],
      );

      expect(company.type).toBe(CompanyEnum.Corporativa);
      expect(company.type).toBe('Corporativa');
      expect(company.transferDates.length).toBe(2);
    });

    it('should handle empty transfer dates array', () => {
      const company = new Company(
        '4',
        'No Transfers Company',
        CompanyEnum.Pyme,
        '2025-05-20T10:30:00.000Z',
        [],
      );

      expect(company.transferDates).toBeInstanceOf(Array);
      expect(company.transferDates.length).toBe(0);
    });

    it('should properly store the adhesion date as string', () => {
      const adhesionDate = '2025-04-15T08:45:00.000Z';

      const company = new Company(
        '5',
        'Date Test Company',
        CompanyEnum.Corporativa,
        adhesionDate,
        [],
      );

      expect(company.adhesionDate).toBe(adhesionDate);
      expect(typeof company.adhesionDate).toBe('string');
    });
  });
});
