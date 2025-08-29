/*Test */
import { Test, TestingModule } from '@nestjs/testing';

/*Features */
import { CompanyController } from '../../../adapter/company.controller';
import {
  CompanyEnum,
  ICompany,
  ICompanyInput,
} from '../../../core/domain/company.interface';
import { GetCompanyUseCase } from '../../../core/application/uses-cases/get/get-company.usecase';
import { AddCompanyUseCase } from '../../../core/application/uses-cases/post/add-company.usecase';

describe('CompanyController', () => {
  let controller: CompanyController;
  let getCompanyUseCase: GetCompanyUseCase;
  let addCompanyUseCase: AddCompanyUseCase;

  const mockCompanies: ICompany[] = [
    {
      id: '1',
      name: 'Test Company 1',
      type: CompanyEnum.Pyme,
      adhesionDate: '2025-07-15T10:00:00.000Z',
      transferDates: ['2025-07-20T14:30:00.000Z'],
    },
    {
      id: '2',
      name: 'Test Company 2',
      type: CompanyEnum.Corporativa,
      adhesionDate: '2025-06-10T09:00:00.000Z',
      transferDates: ['2025-07-05T11:20:00.000Z'],
    },
  ];

  const mockCompanyInput: ICompanyInput = {
    name: 'New Company',
    type: CompanyEnum.Pyme,
    transferDates: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: GetCompanyUseCase,
          useValue: {
            getCompaniesByAdhesionDate: jest.fn(),
            getCompaniesLastMonthTransfers: jest.fn(),
          },
        },
        {
          provide: AddCompanyUseCase,
          useValue: {
            addCompany: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    getCompanyUseCase = module.get<GetCompanyUseCase>(GetCompanyUseCase);
    addCompanyUseCase = module.get<AddCompanyUseCase>(AddCompanyUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAdheredCompanies', () => {
    it('should return an array of companies adhered in the last month', async () => {
      jest
        .spyOn(getCompanyUseCase, 'getCompaniesByAdhesionDate')
        .mockResolvedValue(mockCompanies);

      const result = await controller.getAdheredCompanies();

      expect(result).toEqual(mockCompanies);
      expect(getCompanyUseCase.getCompaniesByAdhesionDate).toHaveBeenCalled();
    });

    it('should handle errors when getting adhered companies', async () => {
      const errorMessage = 'Database connection error';
      jest
        .spyOn(getCompanyUseCase, 'getCompaniesByAdhesionDate')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.getAdheredCompanies()).rejects.toThrow(Error);
      expect(getCompanyUseCase.getCompaniesByAdhesionDate).toHaveBeenCalled();
    });
  });

  describe('getTransferringCompanies', () => {
    it('should return an array of companies with transfers in the last month', async () => {
      jest
        .spyOn(getCompanyUseCase, 'getCompaniesLastMonthTransfers')
        .mockResolvedValue(mockCompanies);

      const result = await controller.getTransferringCompanies();

      expect(result).toEqual(mockCompanies);
      expect(
        getCompanyUseCase.getCompaniesLastMonthTransfers,
      ).toHaveBeenCalled();
    });

    it('should handle errors when getting transferring companies', async () => {
      const errorMessage = 'Service unavailable';
      jest
        .spyOn(getCompanyUseCase, 'getCompaniesLastMonthTransfers')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.getTransferringCompanies()).rejects.toThrow(
        Error,
      );
      expect(
        getCompanyUseCase.getCompaniesLastMonthTransfers,
      ).toHaveBeenCalled();
    });
  });

  describe('addCompany', () => {
    it('should add a new company and return updated companies list', async () => {
      const mockAdhesionDate = '2025-08-28T23:44:27.000Z';
      const newCompanyList = [
        ...mockCompanies,
        {
          ...mockCompanyInput,
          id: '3',
          adhesionDate: mockAdhesionDate,
        },
      ];

      jest
        .spyOn(addCompanyUseCase, 'addCompany')
        .mockResolvedValue(newCompanyList);

      const result = await controller.addCompany(mockCompanyInput);

      expect(result).toEqual(newCompanyList);
      expect(addCompanyUseCase.addCompany).toHaveBeenCalledWith(
        mockCompanyInput,
      );
    });

    it('should handle errors when adding a company', async () => {
      const errorMessage = 'Failed to add company';
      jest
        .spyOn(addCompanyUseCase, 'addCompany')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.addCompany(mockCompanyInput)).rejects.toThrow(
        Error,
      );
      expect(addCompanyUseCase.addCompany).toHaveBeenCalledWith(
        mockCompanyInput,
      );
    });
  });
});
