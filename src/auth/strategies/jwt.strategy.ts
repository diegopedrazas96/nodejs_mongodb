import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/interfaces/jwt-payload.interface";
import { UserAuth } from "../entities/auth.entity";
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){
    constructor(
        @InjectModel(UserAuth.name)
        private readonly userAuthModel: Model<UserAuth>
    ){
    super({
        secretOrKey:process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
        
    }
    async validate(payload: JwtPayload):Promise<UserAuth>{
        const {email} = payload;
        const user = await this.userAuthModel.findOne({email});

        if(!user){
            throw new UnauthorizedException('Token not valid');
        }
        return user;
    }
}