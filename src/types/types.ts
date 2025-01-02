// types.ts
export type PersonalInfo = {
    name: string;
    email: string;
    phone: string;
    location: string;
    portfolio?: string;
    linkedin?: string;
  };
  
  export type Education = {
    school: string;
    degree: string;
    year: string;
    gpa?: string;
    courses?: string[];
  };
  
  export type Experience = {
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements?: string[];
  };
  
  export type Skill = string;
  
  export type Certification = {
    name: string;
    issuer?: string;
    year: string;
    expiry?: string;
  };
  
  export type Award = {
    title: string;
    issuer?: string;
    year: string;
    description?: string;
  };
  
  export type Language = {
    name: string;
    proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
  };
  
  export type ResumeData = {
    personalInfo: PersonalInfo;
    summary?: string;
    education: Education[];
    experience?: Experience[];
    skills: Skill[];
    certifications?: Certification[];
    awards?: Award[];
    languages?: Language[];

  };

  export type Template = 'modern' | 'minimal' | 'classic';