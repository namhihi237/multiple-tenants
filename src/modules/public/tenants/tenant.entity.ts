import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';
import { User } from '../user/user.entity';
import { DbServer } from '../db-server/db-server.entity';
@Entity({ name: 'tenants', schema: 'public' })
export class Tenant extends AbstractEntity {
  @Column({ nullable: true })
  creatorUserId: number;

  @Column({ nullable: true })
  lastModificationTime: Date;

  @Column({ nullable: true })
  lastModifierUserId: number;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  deleteTime: Date;

  @Column()
  tenancyName: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  connectionString: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  editionId: number;

  @Column({ nullable: true })
  subscriptionEndDateUtc: Date;

  @Column({ default: false })
  isTrialPeriod: boolean;

  @Column({ nullable: true })
  subscriptionPaymentType: number;

  @Column({ nullable: true })
  tenantDatabaseId: number;

  @ManyToOne(() => User, user => user.tenant)
  @JoinColumn({ name: 'creator_user_id' })
  user: User;

  @OneToOne(() => DbServer, { eager: true, cascade: true })
  @JoinColumn({ name: 'tenantDatabaseId', referencedColumnName: 'id' })
  dbServer: DbServer;
}
