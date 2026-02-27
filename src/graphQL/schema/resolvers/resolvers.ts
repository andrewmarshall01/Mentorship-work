export const resolvers = {
  Query: {
    helloWorld: () => "hello world",
    getPersonByName: (_: unknown, args: { name: string }) => ({
      name: args.name,
      age: 20,
      job: "job",
    }),
  },
};
