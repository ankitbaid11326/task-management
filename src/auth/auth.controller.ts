import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @Post('/signup')
  async signUp (
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  async signIn (@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    console.log("inside signin");
    return this.authService.signIn(authCredentialsDto)
  }
}
