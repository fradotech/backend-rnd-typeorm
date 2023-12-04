import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  // Relation 1
  @ManyToOne(() => User, (user) => user.childs1)
  parent1: User;

  @OneToMany(() => User, (user) => user.parent1)
  childs1: User[];

  // Relation 2
  @ManyToOne(() => User, (user) => user.childs2)
  parent2: User;

  @OneToMany(() => User, (user) => user.parent2)
  childs2: User[];

  // Relation 3
  @ManyToOne(() => User, (user) => user.childs3)
  parent3: User;

  @OneToMany(() => User, (user) => user.parent3)
  childs3: User[];

  // Relation 4
  @ManyToOne(() => User, (user) => user.childs4)
  parent4: User;

  @OneToMany(() => User, (user) => user.parent4)
  childs4: User[];

  // Relation 5
  @ManyToOne(() => User, (user) => user.childs5)
  parent5: User;

  @OneToMany(() => User, (user) => user.parent5)
  childs5: User[];

  // Relation 6
  @ManyToOne(() => User, (user) => user.childs6)
  parent6: User;

  @OneToMany(() => User, (user) => user.parent6)
  childs6: User[];

  // Relation 7
  @ManyToOne(() => User, (user) => user.childs7)
  parent7: User;

  @OneToMany(() => User, (user) => user.parent7)
  childs7: User[];

  // Relation 8
  @ManyToOne(() => User, (user) => user.childs8)
  parent8: User;

  @OneToMany(() => User, (user) => user.parent8)
  childs8: User[];

  // Relation 9
  @ManyToOne(() => User, (user) => user.childs9)
  parent9: User;

  @OneToMany(() => User, (user) => user.parent9)
  childs9: User[];

  // Relation 10
  @ManyToOne(() => User, (user) => user.childs10)
  parent10: User;

  @OneToMany(() => User, (user) => user.parent10)
  childs10: User[];
}