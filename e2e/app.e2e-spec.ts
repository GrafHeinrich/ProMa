import { ProjectmanagementPage } from './app.po';

describe('projectmanagement App', () => {
  let page: ProjectmanagementPage;

  beforeEach(() => {
    page = new ProjectmanagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
