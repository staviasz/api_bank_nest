import { Test, TestingModule } from '@nestjs/testing';
import { AcountsController } from './acounts.controller';
import { AcountsService } from './acounts.service';

describe('AcountsController', () => {
  let controller: AcountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcountsController],
      providers: [AcountsService],
    }).compile();

    controller = module.get<AcountsController>(AcountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
