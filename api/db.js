module.exports = db = {
  resources: [
    {
      id: "64f66015-d8c7-497d-bb9b-d91de60f04ed",
      name: "Matt Wilson",
      skills: [],
    },
    {
      id: "e36d3248-d7ed-4296-84f7-f2d8cc171ed5",
      name: "Andrew Winter",
      skills: [],
    },
    {
      id: "145c7491-40c5-44aa-b500-0abb25731373",
      name: "Dave Foster",
      skills: [],
    },
    {
      id: "6b1889d9-d3af-4660-ad84-5491975ddd89",
      name: "Alex Richards",
      skills: [
        {
          id: 3,
          name: "JavaScript",
        },
        {
          id: 4,
          name: "TypeScript",
        },
        {
          id: 5,
          name: "React",
        },
        {
          id: 7,
          name: "Node",
        },
      ],
    },
    {
      id: "05e187eb-3edc-4424-9a09-2a5b76f3d513",
      name: "Chris Walters",
      skills: [],
    },
    {
      id: "6591501d-db06-46b4-9c82-329727e5319a",
      name: "Sarah West",
      skills: [],
    },
  ],
  skills: [
    {
      id: 1,
      name: "AWS",
      requiredForRoles: [
        {
          id: 3,
          name: "Devops Engineer",
        },
      ],
    },
    {
      id: 2,
      name: "SQL",
      requiredForRoles: [
        {
          id: 2,
          name: "Backend Developer",
        },
        {
          id: 3,
          name: "Devops Engineer",
        },
      ],
    },
    {
      id: 3,
      name: "JavaScript",
      requiredForRoles: [
        {
          id: 1,
          name: "Frontend Developer",
        },
      ],
    },
    {
      id: 4,
      name: "TypeScript",
      requiredForRoles: [
        {
          id: 1,
          name: "Frontend Developer",
        },
      ],
    },
    {
      id: 6,
      name: "Azure",
      requiredForRoles: [
        {
          id: 3,
          name: "Devops Engineer",
        },
      ],
    },
    {
      id: 7,
      name: "Node",
      requiredForRoles: [
        {
          id: 1,
          name: "Frontend Developer",
        },
      ],
    },
    {
      id: 8,
      name: "Python",
      requiredForRoles: [
        {
          id: 3,
          name: "Devops Engineer",
        },
      ],
    },
    {
      id: 9,
      name: ".NET",
      requiredForRoles: [
        {
          id: 2,
          name: "Backend Developer",
        },
      ],
    },
    {
      id: 5,
      name: "React",
      requiredForRoles: [
        {
          id: 1,
          name: "Frontend Developer",
        },
      ],
    },
    {
      id: 10,
      name: "First Aid At Work",
      requiredForRoles: [],
    },
  ],
  roles: [
    {
      id: 1,
      name: "Frontend Developer",
      skillsRequired: [
        {
          id: 3,
          name: "JavaScript",
        },
        {
          id: 4,
          name: "TypeScript",
        },
        {
          id: 5,
          name: "React",
        },
        {
          id: 7,
          name: "Node",
        },
      ],
    },
    {
      id: 2,
      name: "Backend Developer",
      skillsRequired: [
        {
          id: 2,
          name: "SQL",
        },
        {
          id: 9,
          name: ".NET",
        },
      ],
    },
    {
      id: 3,
      name: "Devops Engineer",
      skillsRequired: [
        {
          id: 1,
          name: "AWS",
        },
        {
          id: 2,
          name: "SQL",
        },
        {
          id: 6,
          name: "Azure",
        },
        {
          id: 8,
          name: "Python",
        },
      ],
    },
  ],
};
