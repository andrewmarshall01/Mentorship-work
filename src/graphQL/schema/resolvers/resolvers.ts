import { Resolvers } from "../../../lib/types/generated";
import {
  getHikingTrailsByDifficulty,
  getHikingTrailsByName,
  getHikingTrailsByRating,
} from "../../../lib/ourdoorActivities/hiking";
import {
  getClimbsOnHikingTrail,
  getPeopleWhoCompletedClimb,
} from "../../../lib/ourdoorActivities/climbing";

export const resolvers: Resolvers = {
  Query: {
    helloWorld: () => "hello world",
    getPersonByName: (_: unknown, args: { name: string }) => ({
      name: args.name,
      age: 20,
      job: "job",
    }),
    getCarByOwner: (_: unknown, args) => ({
      owner: {
        name: args.name,
        age: args.age,
        job: args.job,
      },
      licencePlate: "FD09 XPX",
      colour: "white",
    }),
    getHikingTrailByDifficulty: (_: unknown, args) =>
      getHikingTrailsByDifficulty(args.difficulty),
    getHikingTrailsByRating: (_: unknown, args) =>
      getHikingTrailsByRating(args.rating),
    getHikingTrailByName: (_: unknown, args) =>
      getHikingTrailsByName(args.trailName),
    getClimbsByHikingTrail: (_: unknown, args) =>
      getClimbsOnHikingTrail(args.trailName),
    getPeopleByClimb: (_: unknown, args) =>
      getPeopleWhoCompletedClimb(args.routeName),
  },
};
