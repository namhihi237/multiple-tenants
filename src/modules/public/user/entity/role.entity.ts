import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../../abstract.entity';
import { UserRole } from './user-role.entity';

@Entity({ name: 'roles', schema: 'public' })
export class Role extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];
}
