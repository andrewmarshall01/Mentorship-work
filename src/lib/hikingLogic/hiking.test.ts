import { describe, expect, test } from "vitest";
import {
  getHikingTrailsByDifficulty,
  getHikingTrailsByName,
  getHikingTrailsByRating,
} from "./hiking";
import { DificultyRanking } from "../types/generated";

describe("getHikingTrailsByRating", () => {
  test("should throw error for rating above 5", () => {
    expect(() => getHikingTrailsByRating(100)).toThrow(Error);
  });

  test("should throw error for rating bellow one", () => {
    expect(() => getHikingTrailsByRating(0)).toThrow(Error);
  });

  test("should throw error for non integer", () => {
    expect(() => getHikingTrailsByRating(1.2)).toThrow(Error);
  });

  test("should return trails with matching ratings", () => {
    const trails = getHikingTrailsByRating(5);
    trails.map((trail) => {
      expect(trail.rating).toBe(5);
    });
  });
});

describe("getHikingTrailsByDifficulty", () => {
  test("should return trails with the same difficulty", () => {
    const trails = getHikingTrailsByDifficulty(DificultyRanking.Hard);
    trails.map((trail) => expect(trail.difficulty).toBe(DificultyRanking.Hard));
  });
});

describe("getHikingTrailsByName", () => {
  test("should return the correct trail", () => {
    const trail = getHikingTrailsByName("Willow Creek");
    expect(trail?.trailName).toBe("Willow Creek");
  });

  test("should return undefined for no trail", () => {
    const trail = getHikingTrailsByName("fake trail");
    expect(trail).toBe(undefined);
  });
});
