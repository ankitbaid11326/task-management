import { IsString, MinLength, MaxLength, Matches } from 'class-validator'

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password should have 8 characters 1 UpperCase, 1 Lowercase and (1 Special Character or Number)'
  })
  /*
        Regular Expression if for Password should have atleast 1 Uppercase 1 LowerCase
        atleast 1 Number or Special Character
    */
  password: string
}
