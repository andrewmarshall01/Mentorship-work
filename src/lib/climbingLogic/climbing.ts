import {
  ClimbingRoute,
  DificultyRanking,
  HikingTrail,
  Person,
} from "../types/generated";
import { climbs } from "./climbingStubbs";

export const getClimbingRouteByNameLib = (
  targetRouteName: string,
): ClimbingRoute | undefined => {
  const targetRoute = climbs.find(
    (climb) => climb.routeName === targetRouteName,
  );
  return targetRoute;
};

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
