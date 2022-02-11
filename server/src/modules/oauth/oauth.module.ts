import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
<<<<<<< Updated upstream
=======
  imports: [
    HttpModule,
    JwtModule.register({
      secret: process.env.COMONG_ACCESS_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
>>>>>>> Stashed changes
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
