import { Controller, Get } from '@nestjs/common';
import { ApiHideProperty, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('')
  @ApiHideProperty()
  getHello(): string {
    return this.appService.getHello();
  }
}
