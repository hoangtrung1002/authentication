import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signUp(createUserDTO: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDTO.email);
    if (!user) throw new ConflictException('User already exists');
    return await this.userService.create(createUserDTO);
  }
}
