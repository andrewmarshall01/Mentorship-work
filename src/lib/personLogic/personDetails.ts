import { Person } from "../types/generated";
import {
  validatePersonArrayType,
  validatePersonType,
  validatePersonWithFavType,
} from "../typeValidationLogic/validateTypes";
import { PeopleArray } from "./peopleStubbs";

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
