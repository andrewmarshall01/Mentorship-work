import assert from "node:assert/strict";
import test from "node:test";
import {
  getClimbsOnHikingTrail,
  getHikingTrailForClimb,
  getPeopleWhoCompletedClimb,
} from "./climbing";

test("getHikingTrailForClimb returns formatted hiking trail", () => {
  const trail = getHikingTrailForClimb("Birch Loop");

  assert.equal(trail.trailName, "Birch Loop");
  assert.equal(trail.distance, 10.2);
  assert.equal(trail.elevation, 1.1);
  assert.equal(trail.difficulty, "HARD");
  assert.equal(trail.parking, true);
  assert.equal(trail.rating, 5);
});

test("getClimbsOnHikingTrail returns climb for matching trail", () => {
  const climb = getClimbsOnHikingTrail("Raven Ridge");

  assert.equal(climb?.routeName, "Pine Wall");
  assert.equal(climb?.difficulty, "V2");
  assert.equal(climb?.alongTrail, "Raven Ridge");
});

test("getClimbsOnHikingTrail returns undefined for unknown trail", () => {
  const climb = getClimbsOnHikingTrail("Unknown Trail");

  assert.equal(climb, undefined);
});

test("getPeopleWhoCompletedClimb returns all people for Moss Traverse", () => {
  const completedBy = getPeopleWhoCompletedClimb("Moss Traverse");

  assert.equal(completedBy?.length, 3);
  assert.deepEqual(completedBy?.map((person) => person.name).sort(), [
    "Andrew",
    "Bndrew",
    "Cndrew",
  ]);
});

test("getPeopleWhoCompletedClimb returns undefined for unknown route", () => {
  const completedBy = getPeopleWhoCompletedClimb("Unknown Route");

  assert.equal(completedBy, undefined);
});
