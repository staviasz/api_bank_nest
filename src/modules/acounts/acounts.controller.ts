import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PasswordBankGuard } from 'src/guards/password-bank/password-bank.guard';
import { AcountsService } from './acounts.service';
import { CreateAcountDto } from './dto/create-acount.dto';
import { UpdateAcountDto } from './dto/update-acount.dto';

@Controller('acounts')
export class AcountsController {
  constructor(private readonly acountsService: AcountsService) {}

  @Post()
  create(@Body() createAcountDto: CreateAcountDto) {
    return this.acountsService.create(createAcountDto);
  }

  @Get()
  @UseGuards(PasswordBankGuard)
  findAll() {
    return this.acountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcountDto: UpdateAcountDto) {
    return this.acountsService.update(+id, updateAcountDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acountsService.remove(+id);
  }
}
