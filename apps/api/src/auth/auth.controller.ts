import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signUp(@Body() createUserDTO: CreateUserDto) {
    return this.authService.signUp(createUserDTO);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@Request() req) {
    return req.user;
  }
}
