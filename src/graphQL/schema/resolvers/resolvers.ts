import { GraphQLError } from "graphql";

enum DificultyRanking {
  "BEGGINER",
  "INTERMEDIATE",
  "HARD",
  "EXPERT",
}

type CarArgs = {
  name: string;
  age: number;
  job: string;
};

export const resolvers = {
  Query: {
    helloWorld: () => "hello world",
    getPersonByName: (_: unknown, args: { name: string }) => ({
      name: args.name,
      age: 20,
      job: "job",
    }),
    getCarByOwner: (_: unknown, args: CarArgs) => ({
      owner: {
        name: args.name,
        age: args.age,
        job: args.job,
      },
      licencePlate: "FD09 XPX",
      colour: "white",
    }),
    getHikingTrailByDifficulty: (
      _: unknown,
      args: { difficulty: DificultyRanking },
    ) => ({
      distance: 10.2,
      elevation: 1.1,
      difficulty: args.difficulty,
      parking: true,
      rating: 5,
    }),
    getHikingTrailsByRating: (_: unknown, args: { rating: number }) => {
      if (
        args.rating > 5 ||
        args.rating < 1 ||
        !Number.isInteger(args.rating)
      ) {
        throw new GraphQLError("rating must be an integer between 1 and five");
      }
      return {
        distance: 10.2,
        elevation: 1.1,
        difficulty: "HARD",
        parking: true,
        rating: args.rating,
      };
    },
  },
};
// Question for Charlotte: when an arg will be a described type like in car what is best practice
