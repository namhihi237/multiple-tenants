import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthErrorMessage } from '../../../common/constants/message';
import { UserService } from '../user/user.service';
import { InputSignInDto, SignInResponse } from './auth.dto';
import { compareSync } from 'bcrypt';
import { IResponse } from '../../../common/utils/response';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(input: InputSignInDto): Promise<IResponse<any>> {
    const user = await this.userService.findOne('userName', input.userName);
    if (!user) {
      throw new BadRequestException(AuthErrorMessage.AUTH_INCORRECT_USER_NAME_OR_PASSWORD);
    }

    const isMatch = compareSync(input.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(AuthErrorMessage.AUTH_INCORRECT_USER_NAME_OR_PASSWORD);
    }

    const jwtToken = this.signToken(user.id);
    const response: SignInResponse = {
      userInfo: {
        ...user,
        password: undefined,
        googleAuthenticatorKey: undefined,
        emailConfirmationCode: undefined,
        passwordResetCode: undefined,
        signInToken: undefined,
      },
      token: jwtToken,
    };
    return {
      data: response,
    };
  }

  async validate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = await this.validateToken(req);
    if (!user) {
      return false;
    }
    req.user = user;
    return true;
  }

  private async validateToken(req: Request) {
    const authorization = req.headers['authorization'];
    let userId = '';
    let token = '';
    if (authorization && authorization.startsWith('Bearer')) {
      const split = authorization.split('Bearer ');
      if (split.length !== 2) {
        throw new UnauthorizedException();
      }
      token = split[1];
    }

    try {
      const checkJwt = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      userId = checkJwt.userId ? checkJwt.userId : null;
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    if (userId) {
      const user = await this.userService.findOne('id', userId);
      if (!user) {
        throw new NotFoundException(AuthErrorMessage.AUTH_USER_NOT_EXIST);
      }
      return user;
    }
    return null;
  }

  private signToken(userId: number): string {
    return this.jwtService.sign(
      {
        userId: userId,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
  }
}
