import { Project } from "../models/Project";

const API_BASE_URL = "https://api.example.com";

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

export const fetchProjectById = async (id: number): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }
  return response.json();
};