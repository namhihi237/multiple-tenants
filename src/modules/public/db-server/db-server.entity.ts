import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';

@Entity({ name: 'db_servers', schema: 'public' })
export class DbServer extends AbstractEntity {
  @Column({ nullable: true })
  name: string;

  @Column()
  host: string;

  @Column()
  port: number;

  @Column()
  user: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  dbName: string;

  @Column({ default: false })
  isDefault: boolean;
}
