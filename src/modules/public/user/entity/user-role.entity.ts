import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../../abstract.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({ name: 'user_roles', schema: 'public' })
export class UserRole extends AbstractEntity {
  @Column()
  roleId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Role, role => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => User, user => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
