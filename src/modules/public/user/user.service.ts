import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
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

  async findOne(key: string, value: string | number, connection?: DataSource) {
    const usersRepository = connection ? connection.getRepository(User) : this.usersRepository;
    return usersRepository.findOne({
      where: {
        [key]: value,
      },
      relations: {
        tenant: true,
        userRoles: {
          role: true,
          permission: true,
        },
      },
    });
  }

  async create(userCreate: UserCreateDto, role: RoleEnum, connection?: DataSource): Promise<User> {
    const usersRepository = connection ? connection.getRepository(User) : this.usersRepository;
    const hashPassword = await hash(userCreate.password, 10);
    const newUser = usersRepository.create({ ...userCreate, password: hashPassword });
    const createdUser = await usersRepository.save(newUser);

    await this.userRoleService.create(createdUser.id, role, connection);
    return createdUser;
  }
}
