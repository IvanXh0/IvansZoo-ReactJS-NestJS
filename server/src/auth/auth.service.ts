import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import {
  LoginResponseDto,
  UserLoginDto,
  UserRegisterDto,
  UserResponseDto,
} from './dtos/auth.dto';
import { SALT_ROUNDS } from './auth.const';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async register(body: UserRegisterDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);

    const userResponse = await this.userService.createUser({
      ...body,
      password: hashedPassword,
    });

    return userResponse;
  }

  async login(credentials: UserLoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(
      credentials.username,
      credentials.password,
    );

    const accessToken = this.jwtService.sign({
      role: user.role,
      id: user.id,
      name: user.name,
      username: user.username,
    });

    return {
      user,
      accessToken,
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.getUserByUsername(username);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    return user;
  }
}
