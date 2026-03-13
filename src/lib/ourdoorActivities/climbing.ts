export const getHikingTrailForClimb = (trailName: string) => ({
  trailName: trailName,
  distance: 10.2,
  elevation: 1.1,
  difficulty: "HARD",
  parking: true,
  rating: 5,
});

export const getClimbsOnHikingTrail = (trailName: string) => {
  const allClimbsOnTrail = climbs.filter(
    (climb) => climb.alongTrail === trailName,
  );
  if (allClimbsOnTrail && allClimbsOnTrail.length > 0) {
    return allClimbsOnTrail;
  } else {
    return null;
  }
};

export const getPeopleWhoCompletedClimb = (routeName: string) => {
  const thisClimb = climbs.find((climb) => climb.routeName === routeName);
  return thisClimb?.completedBy;
};

const climbs = [
  {
    routeName: "Granite Start",
    difficulty: "V1",
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
    difficulty: "V2",
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
    difficulty: "V3",
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
    difficulty: "V4",
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
    difficulty: "V5",
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
