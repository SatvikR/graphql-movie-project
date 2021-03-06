import { Arg, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Movie } from "../entities/Movie";
import { MovieInput, UpdateMovieInput } from "./input/movieInput";

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async updateMovie(
    @Arg("id", () => ID) id: number,
    @Arg("options", () => UpdateMovieInput) options: UpdateMovieInput
  ) {
    await Movie.update({ id }, options);
    const movie = await Movie.findOne({ id }, { relations: ["director"] });
    console.log(movie);
    return movie;
  }

  @Mutation(() => Movie)
  async createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
    const movie: Movie[] = await getConnection().transaction(async (tm) => {
      return await tm.query(
        `
        with m as (
          insert into movies (title, length, "directorId", "releaseDate")
          values ($1, $2, $3, $4)
          returning *
        )
        select m.*, json_build_object(
          'id', d.id,
          'name', d."name",
          'birthDate', d."birthDate"
        ) director
        from m
        inner join directors d on d.id = m."directorId"
        `,
        [options.title, options.length, options.directorId, options.releaseDate]
      );
    });
    console.log(movie);

    return movie[0];
  }

  @Query(() => Movie, { nullable: true })
  async movie(@Arg("id", () => ID) id: number): Promise<Movie | undefined> {
    const movie: Movie[] = await getConnection().transaction(async (tm) => {
      return await tm.query(
        `
        select m.*, json_build_object(
          'id', d.id,
          'name', d."name",
          'birthDate', d."birthDate"
        ) director
        from movies m
        inner join directors d on d.id = m."directorId"
        where m.id = $1;
        `,
        [id]
      );
    });

    return movie[0];
  }

  @Query(() => [Movie])
  async movies(@Arg("limit", () => Int) limit: number): Promise<Movie[]> {
    const movies = await getConnection().transaction(async (tm) => {
      return await tm.query(
        `
        select m.*, json_build_object(
          'id', d.id,
          'name', d."name",
          'birthDate', d."birthDate"
        ) director
        from movies m
        inner join directors d on d.id = m."directorId"
        order by m."releaseDate" desc
        limit $1;
        `,
        [limit]
      );
    });

    return movies;
  }
}
