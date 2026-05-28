import { IsNumber, IsString } from "class-validator";

export class CreateActivityDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;
}

