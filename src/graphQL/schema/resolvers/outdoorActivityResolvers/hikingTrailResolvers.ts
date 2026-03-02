import { GraphQLError } from "graphql/error/GraphQLError";

export enum DificultyRanking {
  "BEGGINER",
  "INTERMEDIATE",
  "HARD",
  "EXPERT",
}

export const getHikingTrailByDifficulty = (
  _: unknown,
  args: { difficulty: DificultyRanking },
) => ({
  trailName: "Edan Valley",
  distance: 10.2,
  elevation: 1.1,
  difficulty: args.difficulty,
  parking: true,
  rating: 5,
});

export const getHikingTrailByName = (
  _: unknown,
  args: { trailName: string },
) => ({
  trailName: args.trailName,
  distance: 10.2,
  elevation: 1.1,
  difficulty: "HARD",
  parking: true,
  rating: 5,
});

export const getHikingTrailsByRating = (
  _: unknown,
  args: { rating: number },
) => {
  if (args.rating > 5 || args.rating < 1 || !Number.isInteger(args.rating)) {
    throw new GraphQLError("rating must be an integer between 1 and five");
  }
  return [
    {
      trailName: "Edan Valley",
      distance: 10.2,
      elevation: 1.1,
      difficulty: "HARD",
      parking: true,
      rating: args.rating,
    },
    {
      trailName: "Edan Valley2",
      distance: 10.2,
      elevation: 1.1,
      difficulty: "HARD",
      parking: false,
      rating: args.rating,
    },
  ];
};
