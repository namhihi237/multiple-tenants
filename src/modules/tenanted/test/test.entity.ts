import { AbstractEntity } from '../../../abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tests' })
export class Test extends AbstractEntity {
  @Column()
  name: string;
}
