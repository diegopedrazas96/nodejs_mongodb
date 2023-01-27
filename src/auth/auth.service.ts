import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { CreateAuthDto, AuthDto } from './dto';
import { UserAuth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(
    @InjectModel(UserAuth.name)
    private readonly userAuthModel: Model<UserAuth>,
    private readonly jwtServices: JwtService
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { password, email,name } = createAuthDto;
      const user = await this.userAuthModel.create({
        email: email.toLowerCase().trim(),
        name,
        password: bcrypt.hashSync(password, 10)
      });
      return {
        email:user.email,
        password:user.password,
        id:user._id,
        token:this.getJwt({email:user.email})
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async login(loginAuthDto: AuthDto) {
    let user: UserAuth;
    const { email, password } = loginAuthDto;
    user = await this.userAuthModel.findOne({
      email
    }, {
      name: 0
    });
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)')
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid (password)')
    }
    return {
      email:user.email,
      password:user.password,
      id:user._id,
      token:this.getJwt({email:user.email})
    };
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtServices.sign(payload);
    return token;
  }

  private handleExceptions(error: any) {

    if (error.code == process.env.MONGO_SERVER_ERROR_E11000) {
      throw new BadRequestException(`Email exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create User `);
  }

}
