import { render } from '@testing-library/react';
import Skills from './skills';

describe('Skills', () => {
  const TEST_TITLE = 'TEST_TILE';
  const TEST_SKILL_1 = 'TEST_SKILL_1';
  const TEST_SKILL_2 = 'TEST_SKILL_2';
  const TEST_SKILLS = [TEST_SKILL_1, TEST_SKILL_2];
  const TEST_LIST = { TEST_SKILLS };

  it('should render with title and skills', () => {
    const { getByTestId } = render(
      <Skills list={TEST_LIST} title={TEST_TITLE} />
    );

    expect(getByTestId('skills/container')).toBeDefined();
    expect(getByTestId('skills/title').textContent).toEqual(` ${TEST_TITLE}`);
    expect(getByTestId('skills/item-key').textContent).toEqual(
      `· TEST_SKILLS: `
    );
    expect(getByTestId('skills/item-entry').textContent).toEqual(
      TEST_SKILLS.join(', ')
    );
  });
});
