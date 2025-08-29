/*Test */
import { Test, TestingModule } from '@nestjs/testing';

/*Features */
import { CompanyRepository } from '../../../../../infraestructure/persistance/company.repository';
import { ICompanyRepository } from '../../../../../core/application/ports/company.repository.interface';
import { Company } from '../../../../../core/domain/company.entity';
import { CompanyEnum } from '../../../../../core/domain/company.interface';

/*Utils */
import { promises as fs } from 'fs';
import path from 'path';

describe('CompanyRepository', () => {
  let repository: ICompanyRepository;
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
    mockFilePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'infraestructure',
      'persistance',
      'json-company-data.json',
    );
    const MockCompanyRepository = {
      provide: CompanyRepository,
      useFactory: () => {
        const repo = new CompanyRepository();

        // Override the private filePath property using any to access it
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (repo as any).filePath = mockFilePath;
        return repo;
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockCompanyRepository,
        {
          provide: 'ICompanyRepository',
          useExisting: CompanyRepository,
        },
      ],
    }).compile();

    repository = module.get<ICompanyRepository>('ICompanyRepository');

    await fs.writeFile(mockFilePath, JSON.stringify(mockCompanies), 'utf8');
  });

  afterEach(async () => {
    try {
      await fs.unlink(mockFilePath);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  });

  describe('getAllCompanies', () => {
    it('should return an array of companies', async () => {
      const result = await repository.getAllCompanies();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);

      expect(result[0]).toBeInstanceOf(Company);
      expect(result[0].id).toBe('1');
      expect(result[0].name).toBe('Test Company 1');
      expect(result[0].type).toBe(CompanyEnum.Pyme);
    });
  });

  describe('addCompany', () => {
    it('should add a company and return updated companies list', async () => {
      const result = await repository.addCompany(newCompany);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);

      const addedCompany = result.find(
        (company) => company.id === newCompany.id,
      );
      expect(addedCompany).toBeDefined();
      expect(addedCompany?.name).toBe(newCompany.name);
      expect(addedCompany?.type).toBe(newCompany.type);
    });

    it('should handle errors when the file cannot be written', async () => {
      jest
        .spyOn(fs, 'writeFile')
        .mockRejectedValueOnce(new Error('Write error'));

      await expect(repository.addCompany(newCompany)).rejects.toThrow();
    });
  });
});
