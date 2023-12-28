import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';

@Entity({ name: 'tests', schema: 'public' })
export class Test extends AbstractEntity {
  @Column({ nullable: true })
  name: string;
}
