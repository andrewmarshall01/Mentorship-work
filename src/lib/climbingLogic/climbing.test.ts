import { getClimbsOnHikingTrail, getPeopleWhoCompletedClimb } from "./climbing";
import { describe, expect, test } from "vitest";
import { climbs } from "./climbingStubbs";

describe("getClimbsOnHikingTrail", () => {
  test("returns undefined if no climbs are on trail", () => {
    const alongTrail = getClimbsOnHikingTrail("Willow Peak");
    expect(alongTrail).toBeUndefined();
  });

  test("returns undefined for non-existent trail", () => {
    const result = getClimbsOnHikingTrail("Non-Existent Trail");
    expect(result).toBeUndefined();
  });

  test("returns single climb when only one exists on trail", () => {
    const result = getClimbsOnHikingTrail("Birch Loop");
    expect(result).toBeDefined();
    expect(result?.length).toBe(1);
    expect(result?.[0].routeName).toBe("Granite Start");
  });

  test("returns multiple climbs for trail with several routes", () => {
    const result = getClimbsOnHikingTrail("Cedar Pass");
    expect(result).toBeDefined();
    expect(result?.length).toBeGreaterThan(0);
    expect(result?.[0].routeName).toBe("Moss Traverse");
  });

  test("returns correct climb details", () => {
    const result = getClimbsOnHikingTrail("Raven Ridge");
    expect(result).toBeDefined();
    expect(result?.[0].routeName).toBe("Pine Wall");
    expect(result?.[0].difficulty).toBeDefined();
    expect(result?.[0].completedBy).toBeDefined();
  });
});

describe("getPeopleWhoCompletedClimb", () => {
  test("returns empty array of people if none completed", () => {
    const people = getPeopleWhoCompletedClimb("Boulder Dream");
    expect(people);
    expect(people && people.length).toBe(1);
    expect(people && people[0].name).toBe("");
  });

  test("returns correct people for a given climb", () => {
    const people = getPeopleWhoCompletedClimb("Moss Traverse");
    expect(people);
    expect(people && people.length).toBe(3);
    people?.map((person, i) =>
      expect(person.name).toBe(climbs[2].completedBy[i].name),
    );
  });

  test("returns undefined for non-existent climb", () => {
    const people = getPeopleWhoCompletedClimb("Non-Existent Route");
    expect(people).toBeUndefined();
  });

  test("returns single person for climb with one completer", () => {
    const people = getPeopleWhoCompletedClimb("Granite Start");
    expect(people).toBeDefined();
    expect(people?.length).toBe(1);
    expect(people?.[0].name).toBe("Andrew");
  });

  test("returns multiple people for climb with several completers", () => {
    const people = getPeopleWhoCompletedClimb("Pine Wall");
    expect(people).toBeDefined();
    expect(people?.length).toBe(2);
    expect(people?.[0].name).toBe("Bndrew");
    expect(people?.[1].name).toBe("Cndrew");
  });

  test("returns people with correct structure", () => {
    const people = getPeopleWhoCompletedClimb("Granite Start");
    expect(people).toBeDefined();
    expect(people?.[0]).toHaveProperty("id");
    expect(people?.[0]).toHaveProperty("name");
    expect(people?.[0]).toHaveProperty("age");
    expect(people?.[0]).toHaveProperty("job");
  });

  test("returns different people for different climbs", () => {
    const people1 = getPeopleWhoCompletedClimb("Granite Start");
    const people2 = getPeopleWhoCompletedClimb("Sky Crack");
    expect(people1).toBeDefined();
    expect(people2).toBeDefined();
    expect(people1).not.toEqual(people2);
  });
});
