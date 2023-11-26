import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';
import { Role } from '../role/role.entity';
import { UserRole } from '../user-role/user-role.entity';

@Entity({ name: 'permissions', schema: 'public' })
export class Permission extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  roleId: number;

  @ManyToOne(() => Role, role => role.permissions)
  @JoinTable({ name: 'role_id' })
  role: Role;

  @OneToMany(() => UserRole, userRole => userRole.permission)
  userRoles: UserRole[];
}
