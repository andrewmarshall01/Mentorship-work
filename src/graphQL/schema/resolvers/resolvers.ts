import { Person, Resolvers, VScale } from "../../../lib/types/generated";
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
    completedBy: (parent) => {
      return parent.completedBy.map(async (person) => {
        if (person.age === 0 || !person.job || person.job === "") {
          const personDetails = await getPerson(person.name);
          return {
            ...person,
            age: personDetails.age,
            job: personDetails.job,
          };
        }
        return person;
      });
    },
  },
};

const validatePersonType = (object: any): boolean => {
  return true;
};

const getPerson = async (name: string): Promise<Person> => {
  const responce = await fetch(
    `http://localhost:4000/people/${name.toLowerCase()}`,
  );
  if (!responce.ok) {
    throw new Error(`status:  ${responce.status}`);
  }

  const person = await responce.json();
  console.log(person);
  if (validatePersonType(person)) {
    return person;
  } else {
    return {
      name: name,
      job: "",
      age: 0,
    };
  }
};
