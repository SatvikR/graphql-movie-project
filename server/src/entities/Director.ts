import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./Movie";

@ObjectType()
@Entity("directors")
export class Director extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: "text", unique: true })
  name!: string;

  @Field(() => String)
  @Column({ type: "date" })
  birthDate: Date;

  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];
}
