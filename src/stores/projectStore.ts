import { atom } from 'nanostores';
import type { Project } from '../types/project';

export const projectsStore = atom<Project[]>([]);
export const selectedProjectStore = atom<Project | null>(null);

export const setProjects = (projects: Project[]) => {
  projectsStore.set(projects);
};

export const setSelectedProject = (project: Project | null) => {
  selectedProjectStore.set(project);
};