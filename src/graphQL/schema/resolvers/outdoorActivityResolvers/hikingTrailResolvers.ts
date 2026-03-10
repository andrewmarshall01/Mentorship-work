import { GraphQLError } from "graphql/error/GraphQLError";
import { getClimbsOnHikingTrail } from "../../../../lib/ourdoorActivities/climbing";
import {
  getHikingTrailsByDifficuly,
  getHikingTrailsByRating as getHikingTrailsByRatingLib,
} from "../../../../lib/ourdoorActivities/hiking";

export enum DificultyRanking {
  "BEGGINER",
  "INTERMEDIATE",
  "HARD",
  "EXPERT",
}

export const getHikingTrailByDifficulty = (
  _: unknown,
  args: { difficulty: DificultyRanking },
) => getHikingTrailsByDifficuly(args.difficulty);

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
  climbingRoutes: [getClimbsOnHikingTrail(args.trailName)],
});

export const getHikingTrailsByRating = (_: unknown, args: { rating: number }) =>
  getHikingTrailsByRatingLib(args.rating);
