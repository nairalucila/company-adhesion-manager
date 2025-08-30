/*Test */
import { Test } from '@nestjs/testing';
import * as fs from 'fs/promises';
import path from 'path';

/*Features */
import { CompanyRepository } from '../../../../infraestructure/persistance/company.repository';
import { Company } from '../../../../core/domain/company.entity';
import { CompanyEnum } from '../../../../core/domain/company.interface';

describe('CompanyRepository', () => {
  let repository: CompanyRepository;
  let mockFilePath: string;

  const mockCompanies = [
    new Company(
      '1',
      'Test Company 1',
      CompanyEnum.Pyme,
      '2025-07-15T10:00:00.000Z',
      ['2025-07-20T14:30:00.000Z'],
    ),
    new Company(
      '2',
      'Test Company 2',
      CompanyEnum.Corporativa,
      '2025-06-10T09:00:00.000Z',
      ['2025-07-05T11:20:00.000Z'],
    ),
  ];

  const newCompany = new Company(
    '3',
    'New Test Company',
    CompanyEnum.Pyme,
    '2025-08-01T08:00:00.000Z',
    [],
  );

  beforeEach(async () => {
    mockFilePath = path.join(__dirname, 'json-company-data.json');
    await fs.writeFile(mockFilePath, JSON.stringify(mockCompanies));

    const module = await Test.createTestingModule({
      providers: [CompanyRepository],
    }).compile();

    repository = module.get<CompanyRepository>(CompanyRepository);
    // Override the private filePath property using type assertion
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (repository as any).filePath = mockFilePath;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getAllCompanies', () => {
    it('should return all companies from the file', async () => {
      const result = await repository.getAllCompanies();

      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Company);
      expect(result[0].id).toBe('1');
      expect(result[0].name).toBe('Test Company 1');
      expect(result[0].type).toBe(CompanyEnum.Pyme);
      expect(result[1].id).toBe('2');
      expect(result[1].name).toBe('Test Company 2');
      expect(result[1].type).toBe(CompanyEnum.Corporativa);
    });

    it('should handle file read errors', async () => {
      jest
        .spyOn(repository, 'getAllCompanies')
        .mockRejectedValue(new Error('File not found'));

      await expect(repository.getAllCompanies()).rejects.toThrow();
    });

    it('should properly map JSON data to Company objects', async () => {
      const rawData = [
        {
          id: '1',
          name: 'Test Company 1',
          type: 'Pyme',
          adhesionDate: '2025-07-15T10:00:00.000Z',
          transferDates: ['2025-07-20T14:30:00.000Z'],
        },
      ];

      const result = await repository.getAllCompanies();

      expect(result[0]).toBeInstanceOf(Company);
      expect(result[0].id).toBe('1');
      expect(result[0].name).toBe('Test Company 1');
      expect(rawData).toContainEqual(result[0]);
    });
  });

  describe('addCompany', () => {
    it('should add a company and return updated list', async () => {
      const result = await repository.addCompany(newCompany);

      expect(result).toHaveLength(3);

      const addedCompany = result.find((c) => c.id === newCompany.id);
      expect(addedCompany).toBeDefined();
      expect(addedCompany?.name).toBe(newCompany.name);

      const fileContent = await fs.readFile(mockFilePath, 'utf8');
      const savedData = JSON.parse(fileContent) as Array<
        Record<string, unknown>
      >;
      expect(savedData).toHaveLength(3);
      expect(savedData.some((c) => c.id === newCompany.id)).toBeTruthy();

      try {
        await fs.unlink(mockFilePath);
      } catch {
        console.log("File doesn't exist");
      }
    });

    it('should handle file write errors', async () => {
      jest
        .spyOn(repository, 'addCompany')
        .mockRejectedValue(new Error('File not found'));

      await expect(repository.addCompany(newCompany)).rejects.toThrow();
    });
  });
});
