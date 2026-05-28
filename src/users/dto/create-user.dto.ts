import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    avatar: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

