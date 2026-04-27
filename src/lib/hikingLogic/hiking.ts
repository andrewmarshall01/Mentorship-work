import { DificultyRanking, HikingTrail } from "../types/generated";
import { trails } from "./hikingStubbs";

const isValidNewRating = (rating: number): boolean => {
  if (rating > 5 || rating < 1 || !Number.isInteger(rating)) {
    return false;
  } else {
    return true;
  }
};

export const getHikingTrailsByRating = (
  targetRating: number,
): HikingTrail[] => {
  if (isValidNewRating(targetRating)) {
    throw new Error("rating must be an integer between 1 and five");
  }

  return trails.filter(
    (trail) => trail.rating && Math.floor(trail.rating) === targetRating,
  );
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

export const updateTrailRating = (
  trailName: string,
  newRating: number,
): number => {
  if (!isValidNewRating(newRating)) {
    throw new Error("rating must be an integer between 1 and five");
  }

  const targetTrail = getHikingTrailsByName(trailName);

  if (!targetTrail) {
    throw new Error("Trail not found");
  }

  const oldRatingWeighted =
    (targetTrail.rating || 0) * (targetTrail.ratingsCount || 0);
  const newRatingsCount = (targetTrail.ratingsCount || 0) + 1;
  const newRatingWeighted = (oldRatingWeighted + newRating) / newRatingsCount;

  targetTrail.ratingsCount = newRatingsCount;
  targetTrail.rating = newRatingWeighted;

  return newRatingWeighted;
};
