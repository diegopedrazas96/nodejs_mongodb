
import { Prop, Schema , SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose'

@Schema()
export class UserAuth extends Document{

    @Prop({
        unique:true,
        index:true
    })
    email:string;
    
    @Prop()
    password:string;

    @Prop()
    name:string;
}
export const UserAuthSchema = SchemaFactory.createForClass(UserAuth)
