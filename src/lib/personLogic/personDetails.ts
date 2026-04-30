import { json } from "stream/consumers";
import { Person } from "../types/generated";
import {
  validatePersonArrayType,
  validatePersonType,
  validatePersonWithFavType,
} from "../typeValidationLogic/validateTypes";
import { PeopleArray } from "./peopleStubbs";
import { error } from "console";

export type personWithFav = {
  name: string;
  favouriteClimb: string;
  id: string;
};

export const getPersonByIdLib = (targetId: string): Person | undefined => {
  const targetPerson = PeopleArray.find((people) => people.id === targetId);
  return targetPerson;
};

export const getPersonWithFavById = async (
  id: string,
): Promise<personWithFav | undefined> => {
  const responce = await fetch(`http://localhost:5000/id/${id}`);
  if (!responce.ok) {
    throw new Error(`status:  ${responce.status}`);
  }

  const personWithFavDetails = await responce.json();

  if (validatePersonWithFavType(personWithFavDetails)) {
    return personWithFavDetails;
  } else {
    return undefined;
  }
};

export const getPersonWithJobAndAge = async (name: string): Promise<Person> => {
  const responce = await fetch(
    `http://localhost:4000/people/${name.toLowerCase()}`,
  );
  if (!responce.ok) {
    throw new Error(`status:  ${responce.status}`);
  }

  const person = await responce.json();

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

export const getPersonWithJobAndAgeArray = async (
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

  if (validatePersonArrayType(people)) {
    return people.map((person: Person) => ({
      ...person,
      name:
        person.name.charAt(0).toUpperCase() +
        person.name.slice(1).toLowerCase(),
    }));
  } else {
    return peopleList.map((person) => ({
      id: person.id,
      name:
        person.name.charAt(0).toUpperCase() +
        person.name.slice(1).toLowerCase(),
      job: "",
      age: 0,
    }));
  }
};

export const updateFavClimbById = async (
  id: string,
  favouriteRoute: string,
): Promise<string | undefined> => {
  const responce = await fetch("http://localhost:5000/updateFav", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, favouriteRoute }),
  });

  if (!responce.ok) {
    throw new Error(`status: ${responce.status}`);
  }

  const updatedPerson = await responce.json(); // this is the personwithfav type so .favouriteClimb is simply the favourite route name

  if (validatePersonWithFavType(updatedPerson)) {
    return updatedPerson.favouriteClimb;
  } else {
    throw new Error(`invalid responce from pythonPeopleRest`);
  }
};

export const updateJobById = async (
  id: string,
  newJobTitle: string,
): Promise<boolean> => {
  const responce = await fetch("http://localhost:4000/updateJob", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, newJobTitle }),
  });

  if (!responce.ok) {
    throw new Error(`status: ${responce.status}`);
  }

  const success = await responce.json();

  if (typeof success === "boolean") {
    return success;
  } else {
    throw new Error("invalid responce from peopleRest");
  }
};
