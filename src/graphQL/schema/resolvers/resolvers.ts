import { argsToArgsConfig } from "graphql/type/definition";
import {
  getClimbingRouteByNameLib,
  getClimbsOnHikingTrail,
  getPeopleWhoCompletedClimb,
} from "../../../lib/climbingLogic/climbing";
import {
  getHikingTrailsByDifficulty,
  getHikingTrailsByName,
  getHikingTrailsByRating,
  updateTrailRating,
} from "../../../lib/hikingLogic/hiking";
import {
  getPersonByIdLib,
  getPersonWithFavById,
  getPersonWithJobAndAgeArray,
  updateFavClimbById,
  updateJobById,
} from "../../../lib/personLogic/personDetails";
import { Resolvers, VScale } from "../../../lib/types/generated";

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
    getPersonById: (_: unknown, args) => getPersonByIdLib(args.id),
    getClimbingRouteByName: (_: unknown, args) =>
      getClimbingRouteByNameLib(args.routeName),
  },
  Mutation: {
    updateFavClimb: (_: unknown, args) =>
      updateFavClimbById(args.id, args.favouriteRouteName),
    addNewTrailRating: (_: unknown, args) =>
      updateTrailRating(args.trailName, args.rating),
    updateJob: (_: unknown, args) => updateJobById(args.id, args.newJobTitle),
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

  Person: {
    favouriteRoute: async (parent) => {
      if (
        parent.favouriteRoute?.routeName &&
        parent.favouriteRoute.routeName !== ""
      ) {
        return parent.favouriteRoute;
      }
      try {
        const fetchedPersonDetails = await getPersonWithFavById(parent.id);
        if (fetchedPersonDetails && fetchedPersonDetails.favouriteClimb) {
          const fullRoute = getClimbingRouteByNameLib(
            fetchedPersonDetails.favouriteClimb,
          );
          return fullRoute;
        } else {
          return parent.favouriteRoute;
        }
      } catch (error) {
        console.error("failed to retrieve perosn");
      }
    },
    job: async (parent) => {
      if (parent.job && parent.job !== "") {
        return parent.job;
      }

      try {
        const fetchedPeople = await getPersonWithJobAndAgeArray([
          { id: parent.id, name: parent.name },
        ]);
        if (fetchedPeople && fetchedPeople.length > 0) {
          return fetchedPeople[0].job;
        }
      } catch (error) {
        console.error("Failed to fetch job for person", parent.id);
      }

      return parent.job;
    },

    age: async (parent) => {
      if (parent.age && parent.age !== 0) {
        return parent.age;
      }

      try {
        const fetchedPeople = await getPersonWithJobAndAgeArray([
          { id: parent.id, name: parent.name },
        ]);
        if (fetchedPeople && fetchedPeople.length > 0) {
          return fetchedPeople[0].age;
        }
      } catch (error) {
        console.error("Failed to fetch age for person", parent.id);
      }

      return parent.age || 0;
    },
  },
};
