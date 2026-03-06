import { getHikingTrailForClimb } from "../../../../lib/ourdoorActivities/climbing";

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
  alongTrail: getHikingTrailForClimb(args.trailName),
});
