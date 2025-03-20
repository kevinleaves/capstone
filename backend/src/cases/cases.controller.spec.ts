import { Test, TestingModule } from '@nestjs/testing';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { Case } from './cases.entity';
import { CaseStatus } from './enums/case-status.enum';
import { CasePriority } from './enums/case-priority.enum';
import { CreateCaseDto } from './dtos/create-case.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateCaseDto } from './dtos/update-case.dto';

describe('CasesController', () => {
  let controller: CasesController;
  // mock the service
  const mockService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  let service: CasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasesController],
      providers: [CasesService],
    })
      .overrideProvider(CasesService)
      .useValue(mockService)
      .compile();

    controller = module.get<CasesController>(CasesController);

    service = module.get<CasesService>(CasesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /** a controller should:
   * delegate responsibility to the associated service
   * */

  it('createCase => should call the appropriate service method and should return what was passed in', async () => {
    // test if this method calls the appropriate service method

    // test that the controller returns what the service should return

    const testBody = {
      status: CaseStatus.NEW,
      priority: CasePriority.HIGH,
      subject: 'test subject',
    };

    // arrange, act, assert
    const mockedCreate = jest
      .spyOn(service, 'create')
      .mockResolvedValue(testBody as Case);

    // act. call the controller method we're testing.
    // does createCase(testBody) return testBody?
    expect(await controller.createCase(testBody as CreateCaseDto)).toBe(
      testBody,
    );

    expect(mockedCreate).toHaveBeenCalledWith(testBody);
  });

  describe('getAll', () => {
    const mockCases: Case[] = [
      {
        id: 1,
        status: CaseStatus.NEW,
        priority: CasePriority.HIGH,
        subject: 'test subject',
        dateTimeClosed: null,
        dateTimeOpened: new Date(),
      },
    ];
    let mockedGetAll: jest.SpyInstance;

    beforeEach(() => {
      mockedGetAll = jest.spyOn(service, 'getAll').mockResolvedValue(mockCases);
    });

    it('should return call the underlying service', async () => {
      await controller.getAllCases();
      expect(mockedGetAll).toHaveBeenCalled();
    });

    it('should return what the service should return', async () => {
      const res = await controller.getAllCases();
      expect(res).toBe(mockCases);
    });
  });

  describe('getCaseById', () => {
    const mockCase: Case = {
      id: 1,
      status: CaseStatus.NEW,
      priority: CasePriority.HIGH,
      subject: 'test subject',
      dateTimeClosed: null,
      dateTimeOpened: new Date(),
    };
    let mockedGetOne: jest.SpyInstance;

    beforeEach(() => {
      mockedGetOne = jest
        .spyOn(service, 'getOne')
        .mockImplementation((id: number) => {
          if (id === 1) {
            return Promise.resolve(mockCase);
          } else {
            return Promise.resolve(null);
          }
        });
    });

    it('getCaseById => should return the mocked case if given a valid id', async () => {
      // act
      const case1 = await controller.getCaseById(1);

      // assert
      expect(case1).toBe(mockCase);
      expect(mockedGetOne).toHaveBeenCalledTimes(1);
      expect(mockedGetOne).toHaveBeenCalledWith(1);
    });

    it("getCaseById => should throw a not found exception if case isn't found", async () => {
      // act
      const case2 = controller.getCaseById(2);

      // assert
      await expect(case2).rejects.toThrow(NotFoundException);
      expect(mockedGetOne).toHaveBeenCalledTimes(1);
      expect(mockedGetOne).toHaveBeenCalledWith(2);
    });
  });

  describe('updateCaseById', () => {
    const updateDto: UpdateCaseDto = {
      status: CaseStatus.CLOSED,
      subject: 'updated subject',
      dateTimeClosed: new Date(),
    };

    let mockedUpdate: jest.SpyInstance;

    it('updateCaseById => should update the case if valid id & body', async () => {
      // this controller method should call the underlying service method
      // arrange

      const updatedCase = { id: 1, ...updateDto } as Case;

      mockedUpdate = jest
        .spyOn(service, 'update')
        .mockResolvedValueOnce(updatedCase);

      // act
      const result = await controller.updateCaseById(1, updateDto);
      // assert
      expect(mockedUpdate).toHaveBeenCalledWith(1, updateDto);
      expect(result).toBe(updatedCase);
    });

    it('updateCaseById => should not update if invalid id', async () => {
      // this controller method should call the underlying service method
      // arrange
      mockedUpdate = jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException('Case not found!'));

      // act & assert
      await expect(controller.updateCaseById(2, updateDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockedUpdate).toHaveBeenCalledWith(2, updateDto);
    });
  });

  describe('deleteCase', () => {
    let mockedDelete: jest.SpyInstance;
    it('deleteCase => valid id for delete', async () => {
      // arrange
      const mockCase: Case = {
        id: 1,
        status: CaseStatus.NEW,
        priority: CasePriority.HIGH,
        subject: 'test subject',
        dateTimeClosed: null,
        dateTimeOpened: new Date(),
      };

      mockedDelete = jest.spyOn(service, 'remove').mockResolvedValue(mockCase);

      // act
      const res = await controller.deleteCase(1);

      // assert
      expect(res).toBe(mockCase);
      expect(mockedDelete).toHaveBeenCalledWith(1);
    });

    it('deleteCase => invalid id for delete', async () => {
      // arrange
      mockedDelete = jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException(
            'Attempt to delete case unsuccessful. Case was not found.',
          ),
        );

      // assert
      await expect(controller.deleteCase(2)).rejects.toThrow(NotFoundException);
      expect(mockedDelete).toHaveBeenCalledWith(2);
    });
  });
});
