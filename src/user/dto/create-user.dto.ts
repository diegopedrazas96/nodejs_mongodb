import { IsString ,IsOptional} from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    @IsString()
    last_name: string;
    @IsString()
    addres: string;
    @IsString()
    @IsOptional()
    picture?: string;
}
