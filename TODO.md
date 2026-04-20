# TODO / notes

## Mentorship-work/src/graphQL/schema/resolvers/resolvers.ts

considering calling this instead wrote for robustness - failed call to post endpoint leads to no data, this is prefereable for caching and
retrieving data in case of some failures

````
     completedBy: async (parent) => {
       const updatedPeople = await Promise.all(
         parent.completedBy.map(async (person) => {
           if (person.age === 0 || !person.job || person.job === "") {
             return await getPerson(person.name);
           }
           return person;
         }),
       );
       return updatedPeople;
     },```
````

## rest-for-people/src/index.ts

attempt 1 works but messy

```
targetIds.sort();
const targetPeople = namesJson.filter((people) =>
  targetIds.map((id) => id.toLowerCase() === people.id),
);

  {
    id: string;
    name: string;
    age: number;
    job: string;
} | undefined
```

attempt 2: removed to improve robustness ie person removed misalignes indexing

````
let targetPeople: Person[] = [];
for (let i = 0; i < targetIds.length; i++) {
  const index = parseInt(targetIds[i], 10) - 1;
  targetPeople.push(namesJson[index]);
}```
````
