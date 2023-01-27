import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuth } from 'src/auth/entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { userAuthSeed,userSeed } from './seed.data';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(UserAuth.name)
    private readonly userAuthModel: Model<UserAuth>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }
  async excecuteSeed() {

    userAuthSeed.forEach(async({email,name,password})=>{
       await this.userAuthModel.create({
        email,
        name,
        password:bcrypt.hashSync(password,10)
       })
    })
    userSeed.forEach(async({name,last_name,addres})=>{
      await this.userModel.create({
        name,
        last_name,
        addres
      })
    })
    return `Seed excecute `;
  }

}
