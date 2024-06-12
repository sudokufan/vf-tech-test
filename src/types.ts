export interface Resource {
    id: string;
    name: string;
  }
  
export interface Role {
    id: number;
    name: string;
    skillsRequired: [{
        id: number;
        name: string;
        hasSkill: boolean;
    }]
  }