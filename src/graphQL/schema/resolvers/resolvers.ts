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
    allClimbsonTrailDiff: (parent) => {
      if (!parent.trailName) {
        return [];
      }

      if (parent.allClimbsonTrailDiff.length > 0) {
        return parent.allClimbsonTrailDiff;
      }

      const climbsOnTrail = getClimbsOnHikingTrail(parent.trailName);

      if (!climbsOnTrail) {
        return [];
      }

      return climbsOnTrail.map((climb) => climb.difficulty);
    },
  },
  ClimbingRoute: {
    fontDifficulty: (parent) => {
      if (parent.fontDifficulty !== "") {
        return parent.fontDifficulty;
      }
      switch (parent.difficulty) {
        case VScale.V1:
          return "5";
        case VScale.V2:
          return "5+";
        case VScale.V3:
          return "6A-6A+";
        case VScale.V4:
          return "6B-6B+";
        case VScale.V5:
          return "6C-6C+";
        case VScale.V6:
          return "7A";
        case VScale.V7:
          return "7A+";
        case VScale.V8:
          return "7B-7B+";
        case VScale.V9:
          return "7B+-7C";
        case VScale.V10:
          return "7C+";
        default:
          return "";
      }
    },
  },
};
