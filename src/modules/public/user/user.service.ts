import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './user.dto';
import { hash } from 'bcrypt';
import { IResponse } from '../../../common/utils/response';
import { RoleEnum } from '../../../enums/role.enum';
import { UserRoleService } from '../user-role/user-role.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly userRoleService: UserRoleService,
  ) {}

  async getUser(id: number): Promise<IResponse<User>> {
    const user = await this.findOne('id', id);
    return {
      data: {
        ...user,
        password: undefined,
        googleAuthenticatorKey: undefined,
        emailConfirmationCode: undefined,
        passwordResetCode: undefined,
        signInToken: undefined,
        tenant: {
          ...user.tenant,
          connectionString: undefined,
          dbServer: undefined,
        },
      },
    };
  }

  async findOne(key: string, value: string | number) {
    return this.usersRepository.findOne({
      where: {
        [key]: value,
      },
      relations: {
        tenant: true,
        userRoles: {
          role: true,
        },
      },
    });
  }

  async create(userCreate: UserCreateDto, role: RoleEnum): Promise<User> {
    const hashPassword = await hash(userCreate.password, 10);
    const newUser = this.usersRepository.create({ ...userCreate, password: hashPassword });
    const createdUser = await this.usersRepository.save(newUser);

    await this.userRoleService.create(createdUser.id, role);
    return createdUser;
  }
}
