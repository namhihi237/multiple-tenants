import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';
import { UserRole } from '../user-role/user-role.entity';
import { Permission } from '../permission/permission.entity';

@Entity({ name: 'roles', schema: 'public' })
export class Role extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];

  @OneToMany(() => Permission, permission => permission.role)
  permissions: Permission[];
}
