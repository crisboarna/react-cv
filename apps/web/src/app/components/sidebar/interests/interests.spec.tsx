import { render } from '@testing-library/react';
import Interests from './interests';

describe('Interests', () => {
  const TEST_TITLE = 'TEST_TILE';
  const TEST_INTEREST_NAME = 'TEST_INTEREST_NAME';
  const TEST_INTEREST_DESC = 'TEST_INTEREST_DESC';
  const TEST_INTEREST = {
    name: TEST_INTEREST_NAME,
    description: TEST_INTEREST_DESC,
  };
  const TEST_LIST = [TEST_INTEREST];

  it('should render with title and certifications', () => {
    const { getByTestId } = render(
      <Interests list={TEST_LIST} title={TEST_TITLE} />
    );

    expect(getByTestId('interests/container')).toBeDefined();
    expect(getByTestId('interests/item').textContent).toEqual(
      `· ${TEST_INTEREST_NAME}: `
    );
    expect(getByTestId('interests/item-desc').textContent).toEqual(
      ` ${TEST_INTEREST_DESC}`
    );
  });
});
