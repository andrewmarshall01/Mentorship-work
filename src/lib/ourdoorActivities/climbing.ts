import {
  ClimbingRoute,
  DificultyRanking,
  HikingTrail,
  Person,
} from "../types/generated";
import { climbs } from "./stubbedData/climbingStubbs";

export const getHikingTrailForClimb = (trailName: string): HikingTrail => ({
  trailName: trailName,
  distance: 10.2,
  elevation: 1.1,
  difficulty: DificultyRanking.Hard,
  parking: true,
  rating: 5,
  allClimbsonTrailDiff: [],
});

export const getClimbsOnHikingTrail = (
  trailName: string,
): ClimbingRoute[] | undefined => {
  const allClimbsOnTrail = climbs.filter(
    (climb) => climb.alongTrail === trailName,
  );
  if (allClimbsOnTrail && allClimbsOnTrail.length > 0) {
    return allClimbsOnTrail;
  } else {
    return undefined;
  }
};

export const getPeopleWhoCompletedClimb = (
  routeName: string,
): Person[] | undefined => {
  const thisClimb = climbs.find((climb) => climb.routeName === routeName);
  return thisClimb?.completedBy;
};

const validatePersonType = (object: any): boolean => {
  if (
    object.hasOwnProperty("id") &&
    object.hasOwnProperty("name") &&
    object.hasOwnProperty("age") &&
    object.hasOwnProperty("job") &&
    typeof object.id === "string" &&
    typeof object.name === "string" &&
    typeof object.age === "number" &&
    typeof object.job === "string"
  ) {
    return true;
  } else {
    return false;
  }
};

const validatePersonArrayType = (array: any[]): boolean => {
  if (array.map((entry) => validatePersonType(entry)).includes(false)) {
    return false;
  } else {
    return true;
  }
};

export const getPerson = async (name: string): Promise<Person> => {
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
      id: "0000",
      name: name,
      job: "",
      age: 0,
    };
  }
};

type personArrayArgs = {
  id: string;
  name: string;
};

export const getPersonArray = async (
  peopleList: personArrayArgs[],
): Promise<Person[]> => {
  const idList = peopleList.map((person) => person.id);
  const responce = await fetch("http://localhost:4000/peopleArray", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(idList),
  });

  if (!responce.ok) {
    throw new Error(`status: ${responce.status}`);
  }

  const people = await responce.json();
  console.log(people);
  if (validatePersonArrayType(people)) {
    return people;
  } else {
    return peopleList.map((person) => ({
      id: person.id,
      name: person.name,
      job: "",
      age: 0,
    }));
  }
};
