export const getClimbsByHikingTrail = (
  _: unknown,
  args: {
    trailName: string;
  },
) => ({
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
  alongTrail: {
    trailName: args.trailName,
    distance: 10.2,
    elevation: 1.1,
    difficulty: "HARD",
    parking: true,
    rating: 5,
    climbingRoutes: [],
  },
});
