
import { Prop, Schema , SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose'

@Schema()
export class User extends Document{
    @Prop()
    name: string;
    @Prop()
    last_name: string;
    @Prop()
    addres: string;
    @Prop({
        default:"noPicture"
    })
    picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User)