import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';
import { UserRole } from '../user-role/user-role.entity';
import { Role } from '../role/role.entity';

@Entity({ name: 'permissions', schema: 'public' })
export class Permission extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => UserRole, userRole => userRole.permission)
  userRoles: UserRole[];

  @ManyToMany(() => Role, role => role.permissions)
  @JoinTable()
  roles: Role[];
}
