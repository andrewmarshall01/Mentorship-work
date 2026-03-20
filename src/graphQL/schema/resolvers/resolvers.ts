import { Resolvers, VScale } from "../../../lib/types/generated";
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
  HikingTrail: {
    climbAverageDifficulty: (parent) => {
      const climbsOnTrail =
        parent.trailName && getClimbsOnHikingTrail(parent.trailName);

      const toNumber = (vScaleVal: VScale): number => {
        switch (vScaleVal) {
          case VScale.V1:
            return 1;
          case VScale.V2:
            return 2;
          case VScale.V3:
            return 3;
          case VScale.V4:
            return 4;
          case VScale.V5:
            return 5;
          case VScale.V6:
            return 6;
          case VScale.V7:
            return 7;
          case VScale.V8:
            return 8;
          case VScale.V9:
            return 9;
          case VScale.V10:
            return 10;
          default:
            return 0;
        }
      };

      const toVScale = (numVal: number): VScale => {
        switch (numVal) {
          case 1:
            return VScale.V1;
          case 2:
            return VScale.V2;
          case 3:
            return VScale.V3;
          case 4:
            return VScale.V4;
          case 5:
            return VScale.V5;
          case 6:
            return VScale.V6;
          case 7:
            return VScale.V7;
          case 8:
            return VScale.V8;
          case 9:
            return VScale.V9;
          case 10:
            return VScale.V10;
          default:
            return VScale.V1;
        }
      };
      const climbsAveDifficulty =
        climbsOnTrail &&
        climbsOnTrail
          .map((climb) => toNumber(climb.difficulty))
          .reduce((a: number, b: number) => a + b, 0) / climbsOnTrail.length;

      return climbsAveDifficulty
        ? toVScale(Math.round(climbsAveDifficulty))
        : undefined;
    },
  },
};
