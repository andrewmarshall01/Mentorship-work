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

## main.py

```## NOT ACTUALLY NEEDED FOR THIS PROJ
# app.config.from_mapping(
#     SECRET_KEY='dev',
#     DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite')
# )

# app.config.from_pyfile('config.py', silent=True)

# os.makedirs(app.instance_path, exist_ok=True)
```

```
# @app.route('/peopleArray', methods=['POST'])
# def people():
#     peopleArr = request.json
#     res = getPeopleByIdArray(peopleArr)
#     if res:
#         return jsonify(res)
#     else:
#         return jsonify({'error': 'No matching people found'}), 404
```

## people functions

```
# def getPeopleByIdArray(idList: list[str]) -> list[Person]:

#     current_dir = os.path.dirname(os.path.abspath(__file__))
#     people_path = os.path.join(os.path.dirname(current_dir), 'people.json')

#     with open(people_path) as peopleFile:
#         people = json.load(peopleFile)
#     peopleToReturn = []
#     for person in people:
#         if person['id'] in idList:
#             peopleToReturn.append(person)
#     return peopleToReturn
```
