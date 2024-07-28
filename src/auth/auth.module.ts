import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { STRATEGY_JWT_AUTH } from './constants/strategy.constant';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    SharedModule,
    PassportModule.register({ defaultStrategy: STRATEGY_JWT_AUTH }),
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: async (configService: ConfigService) => ({
        publicKey: configService.get<string>('jwt.publicKey'),
        privateKey: configService.get<string>('jwt.privateKey'),
        clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
        clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
        callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
        signOptions: {
          algorithm: 'RS256',
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAuthStrategy, JwtRefreshStrategy, GoogleStrategy],
})
export class AuthModule {}
