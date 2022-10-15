export interface Institution {
  name: string;
  description: string;
  url: string;
  social: {
    facebook: string;
    twitter?: string;
    instagram?: string;
  };
  email: string;
  logo: string;
  status: 1 | 0;
}

export interface Course {
  institutionName: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  start: string;
  duration: string;
  schedule: string;
  url: string;
}

export interface Data {
  institution: Institution;
  courses: Course[];
}
