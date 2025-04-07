import { IsString, IsEmail, IsNotEmpty, MinLength, IsBoolean, IsDateString } from "class-validator";
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'john.wick@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password1234' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: 'John Wick' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '1980-11-12' })
    @IsDateString()
    @Transform(({ value }) => new Date(value))
    dateOfBirth: Date;

    @ApiProperty({ example: 'Male' })
    @IsString()
    @IsNotEmpty()
    gender: string;

    @ApiProperty({ example: '123 Main St' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    subscribeToNewsletter: boolean;
}