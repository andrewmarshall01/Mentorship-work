import { DificultyRanking, HikingTrail } from "../types/generated";
import { trails } from "./hikingStubbs";

export const getHikingTrailsByRating = (
  targetRating: number,
): HikingTrail[] => {
  if (targetRating > 5 || targetRating < 1 || !Number.isInteger(targetRating)) {
    throw new Error("rating must be an integer between 1 and five");
  }

  return trails.filter((trail) => trail.rating === targetRating);
};

export const getHikingTrailsByDifficulty = (
  targetDifficulty: DificultyRanking,
): HikingTrail[] => {
  return trails.filter((trail) => trail.difficulty === targetDifficulty);
};

export const getHikingTrailsByName = (
  targetName: string,
): HikingTrail | undefined =>
  trails.find((trail) => trail.trailName === targetName);
