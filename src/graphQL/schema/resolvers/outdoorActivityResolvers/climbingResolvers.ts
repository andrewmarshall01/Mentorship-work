import {
  getHikingTrailForClimb,
  getPeopleWhoCompletedClimb,
  getClimbsOnHikingTrail,
} from "../../../../lib/ourdoorActivities/climbing";

export const getClimbsByHikingTrail = (
  _: unknown,
  args: {
    trailName: string;
  },
) => getClimbsOnHikingTrail(args.trailName);

export const getPeopleByClimb = (_: unknown, args: { routeName: string }) =>
  getPeopleWhoCompletedClimb(args.routeName);
