import {
  getClimbingRouteByNameLib,
  getClimbsOnHikingTrail,
} from "../../../../lib/climbingLogic/climbing";
import { updateTrailRating } from "../../../../lib/hikingLogic/hiking";
import {
  getPersonWithJobAndAgeArray,
  updateFavClimbById,
} from "../../../../lib/personLogic/personDetails";
import { Resolvers, VScale } from "../../../../lib/types/generated";

export const climbingResolvers: Partial<Resolvers> = {
  Query: {
    getClimbsByHikingTrail: (_: unknown, args) =>
      getClimbsOnHikingTrail(args.trailName),
    getClimbingRouteByName: (_: unknown, args) =>
      getClimbingRouteByNameLib(args.routeName),
  },
  Mutation: {
    updateFavClimb: (_: unknown, args) =>
      updateFavClimbById(args.id, args.favouriteRouteName),
    addNewTrailRating: (_: unknown, args) =>
      updateTrailRating(args.trailName, args.rating),
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
      const fetchedPeople =
        await getPersonWithJobAndAgeArray(peopleNeedingData);

      return parent.completedBy.map((person) => {
        if (person.age === 0 || !person.job || person.job === "") {
          const fetchedPerson = fetchedPeople.find((p) => p.id === person.id);
          return fetchedPerson || person;
        }
        return person;
      });
    },
  },
};
