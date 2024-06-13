export interface Resource {
  id: string;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  skillsRequired: [
    {
      id: number;
      name: string;
      hasSkill: boolean;
    }
  ];
}

export interface Skill {
  id: number;
  name: string;
  requiredForRoles: [
    {
      id: number;
      name: string;
    }
  ];
}

export type ButtonValues = "skills" | "eligibility";
