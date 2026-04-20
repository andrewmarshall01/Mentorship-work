import { personWithFav } from "../person/personDetails";
import { ClimbingRoute, HikingTrail, Person } from "../types/generated";

export const validatePersonType = (object: any): object is Person => {
  if (
    object.hasOwnProperty("id") &&
    typeof object.id === "string" &&
    object.hasOwnProperty("name") &&
    typeof object.name === "string" &&
    object.hasOwnProperty("age") &&
    typeof object.age === "number" &&
    object.hasOwnProperty("job") &&
    typeof object.job === "string"
  ) {
    return true;
  } else {
    return false;
  }
};

export const validatePersonArrayType = (array: any[]): array is [Person] => {
  if (array.map((entry) => validatePersonType(entry)).includes(false)) {
    return false;
  } else {
    return true;
  }
};

export const validateHikingTrailType = (object: any): object is HikingTrail => {
  if (
    object.hasOwnProperty("trailName") &&
    typeof object.trailName === "string" &&
    object.hasOwnProperty("distance") &&
    typeof object.distance === "number" &&
    object.hasOwnProperty("elevation") &&
    typeof object.elevation === "number" &&
    object.hasOwnProperty("difficulty") &&
    typeof object.parking === "boolean" &&
    object.hasOwnProperty("rating") &&
    typeof object.rating === "number" &&
    object.hasOwnProperty("climbingRoutes") &&
    object.hasOwnProperty("allClimbsonTrailDiff")
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateArrayOfHikingTrailType = (
  array: any[],
): array is [HikingTrail] => {
  if (array.map((entry) => validateHikingTrailType(entry)).includes(false)) {
    return false;
  } else {
    return true;
  }
};

export const validateClimbingRouteType = (
  object: any,
): object is ClimbingRoute => true;

export const validateArrayOfClimbingRouteType = (
  array: any[],
): array is [ClimbingRoute] => {
  if (array.map((entry) => validateClimbingRouteType(entry)).includes(false)) {
    return false;
  } else {
    return true;
  }
};

export const validatePersonWithFavType = (
  object: any,
): object is personWithFav => {
  if (
    object.hasOwnProperty("name") &&
    typeof object.name === "string" &&
    object.hasOwnProperty("favouriteClimb") &&
    typeof object.favouriteClimb === "string" &&
    object.hasOwnProperty("id") &&
    typeof object.id === "string"
  ) {
    return true;
  }
  return false;
};
