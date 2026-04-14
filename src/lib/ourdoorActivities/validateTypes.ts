export const validatePersonType = (object: any): boolean => {
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

export const validatePersonArrayType = (array: any[]): boolean => {
  if (array.map((entry) => validatePersonType(entry)).includes(false)) {
    return false;
  } else {
    return true;
  }
};

export const validateHikingTrailType = (object: any): boolean => {
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

export const validateClimbingRouteType = (object: any): boolean => true;

type validateArrayOfCustomTypeArgs = {
  array: any[];
  targetType: "hikingTrail" | "climbingRoute" | "person"; // add any new types to this as theyre made
};
export const validateArrayOfCustomType = ({
  array,
  targetType,
}: validateArrayOfCustomTypeArgs): boolean => {
  switch (targetType) {
    case "hikingTrail":
      if (
        array.map((entry) => validateHikingTrailType(entry)).includes(false)
      ) {
        return false;
      } else {
        return true;
      }
    case "climbingRoute":
      if (
        array.map((entry) => validateClimbingRouteType(entry)).includes(false)
      ) {
        return false;
      } else {
        return true;
      }
    case "person":
      if (array.map((entry) => validatePersonType(entry)).includes(false)) {
        return false;
      } else {
        return true;
      }
    default:
      throw new Error("invalid targetType to validate");
  }
};
