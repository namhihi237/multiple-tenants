import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';
import { Permission } from '../permission/permission.entity';

@Entity({ name: 'user_roles', schema: 'public' })
export class UserRole extends AbstractEntity {
  @Column()
  roleId: number;

  @Column()
  userId: number;

  @Column()
  permission_id: number;

  @ManyToOne(() => Role, role => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => User, user => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Permission, permission => permission.userRoles)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}
