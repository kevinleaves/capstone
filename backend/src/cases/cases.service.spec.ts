import { Test, TestingModule } from '@nestjs/testing';
import { CasesService } from './cases.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Case } from './cases.entity';
import { Repository } from 'typeorm';
import { CasePriority } from './enums/case-priority.enum';
import { CaseStatus } from './enums/case-status.enum';
import { CreateCaseDto } from './dtos/create-case.dto';

// create a mock implementation of the repository
const mockCaseRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('CasesService', () => {
  let service: CasesService;
  let repository: Repository<Case>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasesService,
        {
          provide: getRepositoryToken(Case),
          useValue: mockCaseRepository,
        },
      ],
    }).compile();

    service = module.get<CasesService>(CasesService);
    repository = module.get<Repository<Case>>(getRepositoryToken(Case));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all cases when getAll is called', async () => {
      const result = [{ id: 1, subject: 'Test Case' }];
      // makes repository's "find" method always return the result
      const mockedFind = jest
        .spyOn(repository, 'find')
        .mockResolvedValue(result as Case[]);

      const res = await service.getAll();
      expect(res).toBe(result);

      expect(mockedFind).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    // test if service delegates responsibility to repository methods
    it('should find case by id', async () => {
      const mockCase: Case = {
        id: 1,
        subject: 'test case',
        priority: CasePriority.HIGH,
        status: CaseStatus.OPEN,
        dateTimeOpened: new Date(),
        dateTimeClosed: null,
      };
      // set a return value for this mock repository's "findOne method when passed in an case id of 1"
      const mockedFindOne = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockCase);

      const caseWithIdOf1 = await service.getOne(1);

      // this should not exist and should return null
      expect(caseWithIdOf1).toBe(mockCase);

      expect(mockedFindOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('should return null when case not found', async () => {
      // set a return value for this mock repository's "findOne method when passed in an case id of 1"
      const mockedFindOne = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(null);

      // this should not exist and should return null
      const res = await service.getOne(2);

      expect(res).toBe(null);

      expect(mockedFindOne).toHaveBeenCalledWith({ where: { id: 2 } });
    });
  });

  describe('create', () => {
    // create a case given correct data
    it('should create a case given correct data', async () => {
      // arrange: user input without dateTimeOpened
      const createCaseDto: Omit<Case, 'id'> = {
        subject: 'test subject',
        priority: CasePriority.HIGH,
        status: CaseStatus.NEW,
        dateTimeOpened: new Date(),
        dateTimeClosed: null,
      };

      // save method injects the id
      const expectedSavedCase: Case = {
        ...createCaseDto,
        id: 1,
      };

      // every time i run mockedCreate/repository.create it returns the createdCase
      const mockedCreate = jest
        .spyOn(repository, 'create')
        .mockReturnValue(expectedSavedCase);

      const mockedSave = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(expectedSavedCase);

      // act
      const res = await service.create(createCaseDto as CreateCaseDto);

      // assert:
      // repo.create is called with the user inputted form data, which creates & returns a case with id, which we then save
      expect(mockedCreate).toHaveBeenCalledWith(createCaseDto);
      expect(mockedCreate).toHaveBeenCalledTimes(1);

      // repo.save should've called with the result of repo.create
      expect(mockedSave).toHaveBeenCalledWith(expectedSavedCase);
      expect(mockedSave).toHaveBeenCalledTimes(1);

      expect(res).toEqual(expectedSavedCase);
    });
  });
});
