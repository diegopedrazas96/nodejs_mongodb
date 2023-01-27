import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuth, UserAuthSchema } from './entities/auth.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports: [
    MongooseModule.forFeature([
      {
        name: UserAuth.name,
        schema: UserAuthSchema
      }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports:[],
      inject:[],
      useFactory: ()=>{
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
                expiresIn: '2h'
              }
        }
      }
    }),
  ],
  exports: [MongooseModule,JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
