import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UserLoginPayloadDto {
  @ApiProperty({
    example: 'default.admin@example.com',
    description: 'User email address',
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsString({ message: i18nValidationMessage('validation.INVALID_STRING') })
  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  email_address: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsString({ message: i18nValidationMessage('validation.INVALID_STRING') })
  @Length(8, 64, {
    message: i18nValidationMessage('validation.MIN_MAX'),
  })
  password: string;
}
