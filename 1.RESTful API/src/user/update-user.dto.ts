import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Updated Name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '1995-05-15' })
  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  dateOfBirth?: Date;

  @ApiProperty({ example: 'Female' })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: '456 Oak Ave' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  subscribeToNewsletter?: boolean;
}