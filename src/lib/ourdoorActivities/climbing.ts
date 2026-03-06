export const getHikingTrailForClimb = (trailName: string) => ({
  trailName: trailName,
  distance: 10.2,
  elevation: 1.1,
  difficulty: "HARD",
  parking: true,
  rating: 5,
});

export const getClimbsOnHikingTrail = (trailName: string) => ({
  routeName: "testR",
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
  alongTrail: trailName,
});

export const getPeopleWhoCompletedClimb = () => {
  return "andrew";
};
