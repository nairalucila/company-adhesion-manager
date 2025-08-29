/*Test */
import { Test } from '@nestjs/testing';

/*Features */
import { GetCompanyUseCase } from '../../../../../../core/application/uses-cases/get/get-company.usecase';
import {
  ICompany,
  CompanyEnum,
} from '../../../../../../core/domain/company.interface';

/*Utils */
import * as utils from '../../../../../../core/application/uses-cases/utils/utils.usescases';

describe('GetCompanyUseCase', () => {
  let getCompanyUseCase: GetCompanyUseCase;

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

    jest.spyOn(utils, 'getLastMonth').mockReturnValue('2023-08');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should filter companies with transfers in the last month', async (): Promise<void> => {
    const expectedCompanies = [mockCompanies[0], mockCompanies[1]];

    const result = await getCompanyUseCase.getCompaniesLastMonthTransfers();

    expect(mockCompanyRespository.getAllCompanies).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining(expectedCompanies));
  });

  it('should filter companies by adhesion date in the last month', async (): Promise<void> => {
    const expectedCompanies = [mockCompanies[1]];

    const result = await getCompanyUseCase.getCompaniesByAdhesionDate();

    expect(mockCompanyRespository.getAllCompanies).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result).toEqual(expect.arrayContaining(expectedCompanies));
  });

  it('should handle error when getting companies by adhesion date', async (): Promise<void> => {
    const errorMessage = 'Database connection error';
    jest
      .spyOn(mockCompanyRespository, 'getAllCompanies')
      .mockRejectedValueOnce(new Error(errorMessage));
    jest.spyOn(console, 'log').mockImplementation();

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
