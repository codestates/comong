import { Module, Global } from '@nestjs/common';
import { TokenService } from './token';

Global()
@Module({
  providers: [TokenService],
  exports: [TokenService]
})
export class UtilModule {}
