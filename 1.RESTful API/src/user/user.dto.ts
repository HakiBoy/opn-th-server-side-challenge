import { ApiProperty } from '@nestjs/swagger';

// use to define the shape of data over api response
export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  subscribeToNewsletter: boolean;
}