import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class MovieInput {
  @Field(() => String)
  title!: string;

  @Field(() => Int)
  length!: number;

  @Field(() => String)
  releaseDate!: Date;

  @Field(() => ID)
  directorId!: number;
}

@InputType()
export class UpdateMovieInput {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => Int, { nullable: true })
  length: number;

  @Field(() => String, { nullable: true })
  releaseDate: Date;

  @Field(() => ID, { nullable: true })
  directorId: number;
}
