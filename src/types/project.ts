export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
  };
  featured?: boolean;
}
