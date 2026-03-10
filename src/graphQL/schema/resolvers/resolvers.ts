import {
  getHikingTrailByDifficulty,
  DificultyRanking,
  getHikingTrailsByRating,
  getHikingTrailByName,
} from "./outdoorActivityResolvers/hikingTrailResolvers";
import {
  getClimbsByHikingTrail,
  getPeopleByClimb,
} from "./outdoorActivityResolvers/climbingResolvers";

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
    getHikingTrailByDifficulty,
    getHikingTrailsByRating,
    getHikingTrailByName,
    getClimbsByHikingTrail,
    getPeopleByClimb,
  },
};
