import assert from "node:assert/strict";
import test from "node:test";
import { GraphQLError } from "graphql";
import {
  DificultyRanking,
  getHikingTrailsByDifficuly,
  getHikingTrailsByRating,
} from "./hiking";

test("getHikingTrailsByRating returns matching trail", () => {
  const results = getHikingTrailsByRating(3);

  assert.equal(results.length, 1);
  assert.equal(results[0].trailName, "Cedar Pass");
  assert.equal(results[0].rating, 3);
});

test("getHikingTrailsByRating throws GraphQLError for invalid rating", () => {
  assert.throws(
    () => getHikingTrailsByRating(0),
    (error: unknown) =>
      error instanceof GraphQLError &&
      error.message === "rating must be an integer between 1 and five",
  );
});

test("getHikingTrailsByDifficuly returns all INTERMEDIATE trails", () => {
  const results = getHikingTrailsByDifficuly(DificultyRanking.INTERMEDIATE);

  assert.equal(results.length, 2);
  assert.ok(
    results.every(
      (trail) => trail.difficulty === DificultyRanking.INTERMEDIATE,
    ),
  );
  assert.deepEqual(results.map((trail) => trail.trailName).sort(), [
    "Cedar Pass",
    "Raven Ridge",
  ]);
});
