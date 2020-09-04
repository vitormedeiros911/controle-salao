import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true, length: 15 })
  phone: string;
}
