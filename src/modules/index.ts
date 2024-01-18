import { AcountsModule } from './acounts/acounts.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransationsModule } from './transations/transations.module';

export const featureModules = [PrismaModule, AcountsModule, TransationsModule];
