import { DificultyRanking } from "../../lib/types/generated";

const trails = [
  {
    trailName: "Birch Loop",
    distance: 3.2,
    elevation: 0.2,
    difficulty: DificultyRanking.Beginner,
    parking: true,
    rating: 1,
  },
  {
    trailName: "Raven Ridge",
    distance: 5.8,
    elevation: 0.45,
    difficulty: DificultyRanking.Intermediate,
    parking: true,
    rating: 2,
  },
  {
    trailName: "Cedar Pass",
    distance: 8.1,
    elevation: 0.9,
    difficulty: DificultyRanking.Intermediate,
    parking: false,
    rating: 3,
  },
  {
    trailName: "Granite Steps",
    distance: 10.4,
    elevation: 1.3,
    difficulty: DificultyRanking.Hard,
    parking: true,
    rating: 4,
  },
  {
    trailName: "Falcon Summit",
    distance: 14.6,
    elevation: 1.9,
    difficulty: DificultyRanking.Expert,
    parking: false,
    rating: 5,
  },
];

export const getHikingTrailsByRating = (targetRating: number) => {
  if (targetRating > 5 || targetRating < 1 || !Number.isInteger(targetRating)) {
    throw new Error("rating must be an integer between 1 and five");
  }

  return trails.filter((trail) => trail.rating === targetRating);
};

export const getHikingTrailsByDifficulty = (
  targetDifficulty: DificultyRanking,
) => {
  return trails.filter((trail) => trail.difficulty === targetDifficulty);
};

export const getHikingTrailsByName = (targetName: string) =>
  trails.find((trail) => trail.trailName === targetName);
