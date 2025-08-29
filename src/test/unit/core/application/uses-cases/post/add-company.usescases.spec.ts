/*Test */
import { Test } from '@nestjs/testing';

/*Features */
import { AddCompanyUseCase } from '../../../../../../core/application/uses-cases/post/add-company.usecase';
import { Company } from '../../../../../../core/domain/company.entity';
import {
  CompanyEnum,
  ICompanyInput,
} from '../../../../../../core/domain/company.interface';

/*Utils */
import * as utils from '../../../../../../core/application/uses-cases/utils/utils.usescases';

describe('AddCompanyUseCase', () => {
  let addCompanyUseCase: AddCompanyUseCase;

  const mockCompanyInput: ICompanyInput = {
    name: 'Test Company',
    type: CompanyEnum.Pyme,
    transferDates: ['2023-08-15'],
  };

  const mockCompany = new Company(
    'mocked-id',
    'Test Company',
    CompanyEnum.Pyme,
    '2023-08-28T00:00:00.000Z',
    ['2023-08-15'],
  );

  const mockCompanies = [mockCompany];
  const mockCompanyRepository = {
    getAllCompanies: jest.fn(),
    addCompany: jest.fn().mockResolvedValue(mockCompanies),
  };

  beforeEach(async () => {
    jest.spyOn(utils, 'generateId').mockReturnValue('mocked-id');

    const mockDate = new Date('2023-08-28T00:00:00.000Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const moduleRef = await Test.createTestingModule({
      providers: [
        AddCompanyUseCase,
        {
          provide: 'ICompanyRepository',
          useValue: mockCompanyRepository,
        },
      ],
    }).compile();

    addCompanyUseCase = moduleRef.get<AddCompanyUseCase>(AddCompanyUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should successfully add a company and return the result', async () => {
    const result = await addCompanyUseCase.addCompany(mockCompanyInput);

    expect(mockCompanyRepository.addCompany).toHaveBeenCalledTimes(1);
    expect(mockCompanyRepository.addCompany).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'mocked-id',
        name: 'Test Company',
        type: CompanyEnum.Pyme,
        adhesionDate: '2023-08-28T00:00:00.000Z',
        transferDates: ['2023-08-15'],
      }),
    );
    expect(result).toEqual(mockCompanies);
  });

  it('should correctly populate id and adhesionDate fields', async () => {
    const generateIdSpy = jest
      .spyOn(utils, 'generateId')
      .mockReturnValue('mocked-id-123');

    const mockDate = '2025-08-28T10:00:00.000Z';

    mockCompany.adhesionDate = mockDate;
    const addCompanySpy = jest.spyOn(mockCompanyRepository, 'addCompany');

    await addCompanyUseCase.addCompany(mockCompanyInput);

    expect(addCompanySpy).toHaveBeenCalledTimes(1);

    generateIdSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('should handle errors when repository throws an exception', async () => {
    const errorMessage = 'Database connection error';
    mockCompanyRepository.addCompany.mockRejectedValueOnce(
      new Error(errorMessage),
    );
    jest.spyOn(console, 'log').mockImplementation();

    await expect(
      addCompanyUseCase.addCompany(mockCompanyInput),
    ).rejects.toThrow();
    expect(mockCompanyRepository.addCompany).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      'Error to add company',
      expect.any(Error),
    );
  });
});
