enum DificultyRanking {
  "BEGGINER",
  "INTERMEDIATE",
  "HARD",
  "EXPERT",
}

export const resolvers = {
  Query: {
    helloWorld: () => "hello world",
    getPersonByName: (_: unknown, args: { name: string }) => ({
      name: args.name,
      age: 20,
      job: "job",
    }),
    getCarByOwnerName: (_: unknown, args: { ownerName: string }) => ({
      ownerName: args.ownerName,
      licencePlate: "FD09 XPX",
      colour: "white",
    }),
    getHikingTrailByDifficulty: (
      _: unknown,
      args: { difficulty: DificultyRanking },
    ) => ({
      distance: 10.2,
      elevation: 1.1,
      difficulty: args.difficulty,
    }),
  },
};
