import { render } from '@testing-library/react';
import Language from './language';

describe('Language', () => {
  const TEST_TITLE = 'TEST_TILE';
  const TEST_LANGUAGE_NAME = 'TEST_LANGUAGE_NAME';
  const TEST_LANGUAGE_LEVEL = 'TEST_LANGUAGE_LEVEL';
  const TEST_INTEREST = {
    name: TEST_LANGUAGE_NAME,
    level: TEST_LANGUAGE_LEVEL,
  };
  const TEST_LIST = [TEST_INTEREST];

  it('should render with title and certifications', () => {
    const { getByTestId } = render(
      <Language list={TEST_LIST} title={TEST_TITLE} />
    );

    expect(getByTestId('language/container')).toBeDefined();
    expect(getByTestId('language/icon').className).toEqual('far fa-comment');
    expect(getByTestId('language/item-name').textContent).toEqual(
      `${TEST_LANGUAGE_NAME} (${TEST_LANGUAGE_LEVEL})`
    );
    expect(getByTestId('language/item-level').textContent).toEqual(
      ` (${TEST_LANGUAGE_LEVEL})`
    );
  });
});
