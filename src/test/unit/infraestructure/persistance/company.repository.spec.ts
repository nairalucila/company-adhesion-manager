/*Test */
import { Test } from '@nestjs/testing';
import { promises as fs } from 'fs';
import path from 'path';
// We need to use require for mock-fs as it has compatibility issues with TypeScript imports
import mockFs from 'mock-fs';

/*Features */
import { CompanyRepository } from '../../../../infraestructure/persistance/company.repository';
import { Company } from '../../../../core/domain/company.entity';
import { CompanyEnum } from '../../../../core/domain/company.interface';

describe('CompanyRepository', () => {
  let repository: CompanyRepository;
  let mockFilePath: string;

  // Mock data
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
    // Setup mock file system
    mockFilePath = path.join('mock', 'json-company-data.json');

    // Create a mock file system
    mockFs({
      mock: {
        'json-company-data.json': JSON.stringify(mockCompanies),
      },
    });

    const module = await Test.createTestingModule({
      providers: [CompanyRepository],
    }).compile();

    repository = module.get<CompanyRepository>(CompanyRepository);
    // Override the private filePath property
    (repository as any).filePath = mockFilePath;
  });

  afterEach(() => {
    // Restore the real file system
    mockFs.restore();
  });

  describe('getAllCompanies', () => {
    it('should return all companies from the file', async () => {
      // Act
      const result = await repository.getAllCompanies();

      // Assert
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
      // Arrange - simulate file system error
      mockFs.restore(); // Restore real fs first
      mockFs({}); // Empty mock fs to cause error

      // Act & Assert
      await expect(repository.getAllCompanies()).rejects.toThrow();
    });

    it('should properly map JSON data to Company objects', async () => {
      // Arrange
      const rawData = [
        {
          id: '5',
          name: 'Raw Company',
          type: CompanyEnum.Pyme,
          adhesionDate: '2025-05-01T10:00:00.000Z',
          transferDates: ['2025-06-15T12:00:00.000Z'],
        },
      ];

      mockFs.restore();
      mockFs({
        mock: {
          'json-company-data.json': JSON.stringify(rawData),
        },
      });

      // Act
      const result = await repository.getAllCompanies();

      // Assert
      expect(result[0]).toBeInstanceOf(Company);
      expect(result[0].id).toBe('5');
      expect(result[0].name).toBe('Raw Company');
    });
  });

  describe('addCompany', () => {
    it('should add a company and return updated list', async () => {
      // Act
      const result = await repository.addCompany(newCompany);

      // Assert
      expect(result).toHaveLength(3);

      // Check if the new company is in the result
      const addedCompany = result.find((c) => c.id === newCompany.id);
      expect(addedCompany).toBeDefined();
      expect(addedCompany?.name).toBe(newCompany.name);

      // Verify file was updated
      const fileContent = await fs.readFile(mockFilePath, 'utf8');
      const savedData = JSON.parse(fileContent) as Array<
        Record<string, unknown>
      >;
      expect(savedData).toHaveLength(3);
      expect(savedData.some((c) => c.id === newCompany.id)).toBeTruthy();

      // Clean up test file
      try {
        await fs.unlink(mockFilePath);
      } catch {
        // Ignore if file doesn't exist
      }
    });

    it('should handle file write errors', async () => {
      // Arrange - simulate write permission error
      jest
        .spyOn(fs, 'writeFile')
        .mockRejectedValueOnce(new Error('Write error'));

      // Act & Assert
      await expect(repository.addCompany(newCompany)).rejects.toThrow();
    });
  });

  describe('File path resolution', () => {
    it('should use the correct file path format', () => {
      // Create a fresh repository to check its default file path
      const freshRepo = new CompanyRepository();

      // Get the private filePath
      const filePath = (freshRepo as any).filePath;

      // Assert
      expect(typeof filePath).toBe('string');
      expect(filePath).toContain('json-company-data.json');
      // Check if path is absolute - this may vary by environment
      expect(filePath.includes('/')).toBeTruthy();
    });
  });
});
