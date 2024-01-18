import { Module } from '@nestjs/common';
import { AcountsService } from './acounts.service';
import { AcountsController } from './acounts.controller';

@Module({
  controllers: [AcountsController],
  providers: [AcountsService],
})
export class AcountsModule {}
