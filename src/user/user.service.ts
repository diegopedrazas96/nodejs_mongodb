import { Injectable } from '@nestjs/common';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose/dist';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor( 
    @InjectModel(User.name)
    private readonly userModel: Model<User>
    ){}

    async create(createUserDto: CreateUserDto,file: Express.Multer.File) {
      try {
        if(file){
          createUserDto.picture = await this.saveFile(file);
        }
        const user = await this.userModel.create(createUserDto);
        return user;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(`Can't create user`);
      }
    
    }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    let user:User;
    if(isValidObjectId(id)){
      user = await this.userModel.findById(id);
    }
    if(!user){
      throw new NotFoundException(`User with id "${id}" not found`)
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user:User;
      user = await this.userModel.findById(id);
      const updateUser = await user.updateOne(updateUserDto,{ new:true });
      if(!updateUser){
        throw new InternalServerErrorException(`Can't update user`)
      }
      return {
        ...user.toJSON(), ...updateUserDto
      };
  }

  async saveFile(file: Express.Multer.File){
    const fileB64 = file.buffer.toString('base64')
    return fileB64;
    }

}
