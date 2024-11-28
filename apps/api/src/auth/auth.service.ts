import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signUp(createUserDTO: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDTO.email);
    if (user) throw new ConflictException('User already exists');
    return await this.userService.create(createUserDTO);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordMatched = verify(user.password, password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid Credentials!');
    return { id: user.id, name: user.name };
  }
}
