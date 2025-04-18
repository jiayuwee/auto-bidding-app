describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    service = new ProjectService();
  });

  test('should create project', async () => {
    const project = await service.createProject({
      name: 'Test Project',
      bids: []
    });
    expect(project).toHaveProperty('_id');
  });
});