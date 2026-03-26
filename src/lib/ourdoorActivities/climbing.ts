import {
  ClimbingRoute,
  DificultyRanking,
  HikingTrail,
  Person,
  VScale,
} from "../types/generated";

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

const climbs: ClimbingRoute[] = [
  {
    routeName: "Granite Start",
    difficulty: VScale.V1,
    completedBy: [
      {
        name: "Andrew",
        age: 24,
        job: "dev",
      },
    ],
    alongTrail: "Birch Loop",
  },
  {
    routeName: "Pine Wall",
    difficulty: VScale.V2,
    completedBy: [
      {
        name: "Bndrew",
        age: 24,
        job: "dev",
      },
      {
        name: "Cndrew",
        age: 24,
        job: "dev",
      },
    ],
    alongTrail: "Raven Ridge",
  },
  {
    routeName: "Moss Traverse",
    difficulty: VScale.V3,
    completedBy: [
      {
        name: "Andrew",
        age: 24,
        job: "dev",
      },
      {
        name: "Bndrew",
        age: 24,
        job: "dev",
      },
      {
        name: "Cndrew",
        age: 24,
        job: "dev",
      },
    ],
    alongTrail: "Cedar Pass",
  },
  {
    routeName: "Sky Crack",
    difficulty: VScale.V4,
    completedBy: [
      {
        name: "Cndrew",
        age: 24,
        job: "dev",
      },
    ],
    alongTrail: "Granite Steps",
  },
  {
    routeName: "Summit Overhang",
    difficulty: VScale.V5,
    completedBy: [
      {
        name: "Andrew",
        age: 24,
        job: "dev",
      },
      {
        name: "Cndrew",
        age: 24,
        job: "dev",
      },
    ],
    alongTrail: "Falcon Summit",
  },
];
