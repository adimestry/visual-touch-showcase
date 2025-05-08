
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: "logo" | "wedding" | "printing" | "web" | "app" | "other";
  fullDescription?: string;
  gallery?: string[];
}
