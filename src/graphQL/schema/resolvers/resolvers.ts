import { Resolvers } from "../../../lib/types/generated";
import { hikingResolvers } from "./hikingResolvers.ts/hikingResolvers";
import { climbingResolvers } from "./climbingResolvers/climbingResolvers";
import { peopleResolvers } from "./peopleResolvers/peopleResolvers";

export const resolvers: Resolvers = {
  Query: {
    ...hikingResolvers.Query,
    ...climbingResolvers.Query,
    ...peopleResolvers.Query,
  },
  Mutation: {
    ...climbingResolvers.Mutation,
    ...peopleResolvers.Mutation,
  },
  HikingTrail: { ...hikingResolvers.HikingTrail },
  ClimbingRoute: { ...climbingResolvers.ClimbingRoute },
  Person: { ...peopleResolvers.Person },
};
