import { Query, Resolver } from "type-graphql";

@Resolver()
export class DirectorResolver {
  @Query(() => String)
  hello() {
    return "hello";
  }
}
