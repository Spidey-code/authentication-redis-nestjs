import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @Transform(({ value }) => value?.trim())
  @Transform((param) => param.value.toLowerCase())
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,17}$/, {
    message: 'password too weak',
  })
  password: string;
}
