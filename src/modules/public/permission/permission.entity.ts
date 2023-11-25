import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';
import { UserRole } from '../user-role/user-role.entity';

@Entity({ name: 'permissions', schema: 'public' })
export class Permission extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => UserRole, userRole => userRole.permission)
  userRoles: UserRole[];
}
