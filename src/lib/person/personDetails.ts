import { response } from "express";
import { Person } from "../types/generated";
import { validatePersonWithFavType } from "../ourdoorActivities/validateTypes";
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
