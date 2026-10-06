// Describes what a project looks like in our application
export interface Project {
  _id: string;
  name: string;
  description: string;
  user: string;
}

// Describes what a task looks like in our application
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  project: string;
}