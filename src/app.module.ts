/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://janviyadav802:CRwRg2xsTLoT9OgW@cluster0.fyhalzi.mongodb.net/adminui"),
    UserModule,
    AuthModule
  ],
})
export class AppModule { }
