import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Director } from "./Director";

@ObjectType()
@Entity("movies")
export class Movie extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: "text" })
  title!: string;

  @Field(() => Int)
  @Column()
  length!: number;

  @Field(() => String)
  @Column({ type: "date" })
  releaseDate!: Date;

  @Field(() => ID)
  @Column()
  directorId!: number;

  @Field(() => Director)
  @ManyToOne(() => Director, (director) => director.movies)
  director: Director;
}
