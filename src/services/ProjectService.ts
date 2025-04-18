class ProjectService {
  async createProject(projectData: Omit<IProject, '_id'>): Promise<IProject> {
    // 实现创建逻辑
  }
  
  async placeBid(projectId: string, bidData: IBid): Promise<IProject> {
    // 实现竞标逻辑
  }
}