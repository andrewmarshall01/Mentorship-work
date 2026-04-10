import { ClimbingRoute, VScale } from "../../types/generated";

export const climbs: ClimbingRoute[] = [
  {
    routeName: "Granite Start",
    difficulty: VScale.V1,
    fontDifficulty: "5",
    completedBy: [
      {
        id: "0001",
        name: "Andrew",
        age: 0,
        job: "",
      },
    ],
    alongTrail: "Birch Loop",
  },
  {
    routeName: "Pine Wall",
    difficulty: VScale.V2,
    fontDifficulty: "",
    completedBy: [
      {
        id: "0026",
        name: "Bndrew",
        age: 24,
        job: "dev",
      },
      {
        id: "0027",
        name: "Cndrew",
        age: 24,
        job: "dev",
      },
    ],
    alongTrail: "Raven Ridge",
  },
  {
    routeName: "Moss Traverse",
    difficulty: VScale.V3,
    fontDifficulty: "6A-6A+",
    completedBy: [
      {
        id: "0001",
        name: "Andrew",
        age: 24,
        job: "dev",
      },
      {
        id: "0002",
        name: "Michael",
        age: 0,
        job: "",
      },
      {
        id: "0003",
        name: "Emma",
        age: 0,
        job: "",
      },
    ],
    alongTrail: "Cedar Pass",
  },
  {
    routeName: "Sky Crack",
    difficulty: VScale.V4,
    fontDifficulty: "",
    completedBy: [
      {
        id: "0027",
        name: "Cndrew",
        age: 24,
        job: "dev",
      },
      {
        id: "0003",
        name: "Emma",
        age: 0,
        job: "",
      },
    ],
    alongTrail: "Granite Steps",
  },
  {
    routeName: "Summit Overhang",
    difficulty: VScale.V5,
    fontDifficulty: "",
    completedBy: [
      {
        id: "0001",
        name: "Andrew",
        age: 24,
        job: "dev",
      },
      {
        id: "0027",
        name: "Cndrew",
        age: 24,
        job: "dev",
      },
    ],
    alongTrail: "Falcon Summit",
  },
];
