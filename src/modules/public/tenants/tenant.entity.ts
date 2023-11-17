import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';

@Entity({ name: 'tenants' })
export class Tenant extends AbstractEntity {
  @Column({ nullable: true })
  creatorUserId: number;

  @Column({ nullable: true })
  lastModificationTime: Date;

  @Column({ nullable: true })
  lastModifierUserId: number;

  @Column({ default: false })
  isDelete: boolean;

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
}
