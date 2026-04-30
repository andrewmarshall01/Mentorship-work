import {
  getClimbingRouteByNameLib,
  getPeopleWhoCompletedClimb,
} from "../../../../lib/climbingLogic/climbing";
import {
  getPersonByIdLib,
  getPersonWithFavById,
  getPersonWithJobAndAgeArray,
  updateJobById,
} from "../../../../lib/personLogic/personDetails";
import { Resolvers } from "../../../../lib/types/generated";

export const peopleResolvers: Partial<Resolvers> = {
  Query: {
    getPeopleByClimb: (_: unknown, args) =>
      getPeopleWhoCompletedClimb(args.routeName),
    getPersonById: (_: unknown, args) => getPersonByIdLib(args.id),
  },
  Mutation: {
    updateJob: (_: unknown, args) => updateJobById(args.id, args.newJobTitle),
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
