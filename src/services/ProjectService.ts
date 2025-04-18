import { Project } from '../models/Project';

export class ProjectService {
  static async createProject(project: Project) {
    // 实现逻辑
  }

  interface Project {
    id: string;
    budget: number | null;  // 允许null值
    // 其他字段...
  }

  class ProjectService {
    static async getProject(id: string): Promise<Project | null> {
      // 明确返回可能为null
    }
  }
}