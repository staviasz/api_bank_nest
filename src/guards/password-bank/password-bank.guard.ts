import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PasswordBankGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { password } = request.query;

    if (!password) {
      throw new UnauthorizedException('Password is required');
    }

    const { password: passwordBank } = await this.prismaService.bank.findFirst({
      select: {
        password: true,
      },
    });

    if (passwordBank !== password) {
      throw new UnauthorizedException('Password is invalid');
    }
    return true;
  }
}
