import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(6)
    password:string;

    @IsString()
    @MinLength(1)
    name:string;
}
