import { Test } from '@nestjs/testing';
import { GetCompanyUseCase } from '../../../../../../core/application/uses-cases/get/get-company.usecase';
import {
  ICompany,
  CompanyEnum,
} from '../../../../../../core/domain/company.interface';
import * as utils from '../../../../../../core/application/uses-cases/utils/utils.usescases';
//import { ICompanyRepository } from 'src/core/application/ports/company.repository.interface';

describe('GetCompanyUseCase', () => {
  let getCompanyUseCase: GetCompanyUseCase;
  // let companyRepository: ICompanyRepository;

  const mockCompanies: ICompany[] = [
    {
      id: '1',
      name: 'Company 1',
      type: CompanyEnum.Pyme,
      adhesionDate: '2023-07-15',
      transferDates: ['2023-07-20', '2023-08-05'],
    },
    {
      id: '2',
      name: 'Company 2',
      type: CompanyEnum.Corporativa,
      adhesionDate: '2023-08-10',
      transferDates: ['2023-08-15'],
    },
    {
      id: '3',
      name: 'Company 3',
      type: CompanyEnum.Pyme,
      adhesionDate: '2023-06-05',
      transferDates: ['2023-06-10', '2023-07-05'],
    },
  ];

  const mockCompanyRespository = {
    getAllCompanies: jest.fn().mockResolvedValue(mockCompanies),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetCompanyUseCase,
        {
          provide: 'ICompanyRepository',
          useValue: mockCompanyRespository,
        },
      ],
    }).compile();

    getCompanyUseCase = moduleRef.get<GetCompanyUseCase>(GetCompanyUseCase);
    //companyRepository = moduleRef.get<CompanyRepository>(CompanyRepository);

    // Mock the getLastMonth function to return a consistent value for testing
    jest.spyOn(utils, 'getLastMonth').mockReturnValue('2023-08');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should filter companies with transfers in the last month', async (): Promise<void> => {
    // Arrange
    const expectedCompanies = [mockCompanies[0], mockCompanies[1]];

    // Act
    const result = await getCompanyUseCase.getCompaniesLastMonthTransfers();

    // Assert
    expect(mockCompanyRespository.getAllCompanies).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining(expectedCompanies));
  });

  it('should filter companies by adhesion date in the last month', async (): Promise<void> => {
    // Arrange
    const expectedCompanies = [mockCompanies[1]];

    // Act
    const result = await getCompanyUseCase.getCompaniesByAdhesionDate();

    // Assert
    expect(mockCompanyRespository.getAllCompanies).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result).toEqual(expect.arrayContaining(expectedCompanies));
  });

  it('should handle error when getting companies by adhesion date', async (): Promise<void> => {
    // Arrange
    const errorMessage = 'Database connection error';
    jest
      .spyOn(mockCompanyRespository, 'getAllCompanies')
      .mockRejectedValueOnce(new Error(errorMessage));
    jest.spyOn(console, 'log').mockImplementation();

    // Act & Assert
    await expect(
      getCompanyUseCase.getCompaniesByAdhesionDate(),
    ).rejects.toThrow();
    expect(mockCompanyRespository.getAllCompanies).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      'Simulando un error de retorno en casos de usos',
      expect.any(Error),
    );
  });
});
