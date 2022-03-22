import { Module, CacheModule } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: 6379,
  })],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
