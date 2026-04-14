import { Resolvers, VScale } from "../../../lib/types/generated";
import {
  getHikingTrailsByDifficulty,
  getHikingTrailsByName,
  getHikingTrailsByRating,
} from "../../../lib/ourdoorActivities/hiking";
import {
  getClimbsOnHikingTrail,
  getPeopleWhoCompletedClimb,
  // getPerson,
  getPersonArray,
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
    completedBy: async (parent) => {
      const peopleNeedingData = parent.completedBy.filter(
        (person) => person.age === 0 || !person.job || person.job === "",
      );

      if (peopleNeedingData.length === 0) {
        return parent.completedBy;
      }
      const fetchedPeople = await getPersonArray(peopleNeedingData);

      return parent.completedBy.map((person) => {
        if (person.age === 0 || !person.job || person.job === "") {
          const fetchedPerson = fetchedPeople.find((p) => p.id === person.id);
          return fetchedPerson || person;
        }
        return person;
      });
    },
    // considering calling this instead wrote for robustness - failed call to post endpoint leads to no data, this is prefereable for caching and
    // retrieving data in case of some failures

    // completedBy: async (parent) => {
    //   const updatedPeople = await Promise.all(
    //     parent.completedBy.map(async (person) => {
    //       if (person.age === 0 || !person.job || person.job === "") {
    //         return await getPerson(person.name);
    //       }
    //       return person;
    //     }),
    //   );
    //   return updatedPeople;
    // },
  },
};
