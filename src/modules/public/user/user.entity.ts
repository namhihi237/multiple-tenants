import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';
import { Tenant } from '../tenants/tenant.entity';

@Entity({ name: 'users', schema: 'public' })
export class User extends AbstractEntity {
  @Column({ nullable: true })
  creatorUserId: number;

  @Column({ nullable: true })
  lastModificationTime: Date;

  @Column({ nullable: true })
  lastModifierUserId: number;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  deleteUserId: number;

  @Column({ nullable: true })
  deleteTime: Date;

  @Column()
  userName: string;

  @Column({ nullable: true })
  tenantId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  emailConfirmationCode: string;

  @Column({ nullable: true })
  passwordResetCode: string;

  @Column({ nullable: true })
  lockEndDateUtc: Date;

  @Column({ default: 0 })
  accessFailCount: number;

  @Column({ default: false })
  isLockoutEnabled: boolean;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  isPhoneNumberConfirmed: boolean;

  @Column({ nullable: true })
  securityStamp: string;

  @Column({ default: false })
  isTwoFactorEnabled: boolean;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  normalizeUserName: string;

  @Column()
  normalizeEmail: string;

  @Column({ nullable: true })
  concurrencyStamp: string;

  @Column({ nullable: true })
  profilePictureId: number;

  @Column({ default: false })
  shouldChangePasswordNextLogin: boolean;

  @Column({ nullable: true })
  signInTokenExpireTimeUtc: Date;

  @Column({ nullable: true, type: 'text' })
  signInToken: string;

  @Column({ nullable: true, type: 'text' })
  googleAuthenticatorKey: string;

  @Column({ default: true })
  acceptReviewPromotionEmail: boolean;

  @OneToMany(() => Tenant, tenant => tenant.user)
  @JoinColumn({ name: 'tenant_id' })
  tenants: Tenant[];

  @OneToMany(() => User, user => user.creatorUser, { nullable: true })
  @JoinColumn({ name: 'creator_user_id' })
  creatorUser: User;
}
