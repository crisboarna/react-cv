import { render } from '@testing-library/react';
import Cv from './CV';

describe('CV', () => {
  const TEST_ICON = 'TEST_ICON';
  const TEST_TITLE = 'TEST_TITLE';
  const TEST_DESCRIPTION = 'TEST_DESCRIPTION';
  const experienceProps = { title: TEST_TITLE, icon: TEST_ICON };
  const emptyProps = {};

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { queryAllByTestId } = render(<Cv />);
      expect(queryAllByTestId('cv/root').length).toEqual(1);
      expect(queryAllByTestId('section/header-title').length).toEqual(0);
    });

    it('should render given empty props', () => {
      const { queryAllByTestId } = render(
        <Cv
          profile={emptyProps}
          experience={emptyProps}
          projects={emptyProps}
          sidebar={emptyProps}
        />
      );
      expect(queryAllByTestId('cv/root').length).toEqual(1);
      expect(queryAllByTestId('section/header-title').length).toEqual(3);
    });

    it('should render experience category', () => {
      const { queryAllByTestId, getByTestId } = render(
        <Cv experience={experienceProps} />
      );
      expect(queryAllByTestId('cv/root').length).toEqual(1);
      expect(getByTestId('section/header-title').textContent).toEqual(
        TEST_TITLE
      );
    });

    describe('profile', () => {
      const allProfileProps = {
        title: TEST_TITLE,
        icon: TEST_ICON,
        description: TEST_DESCRIPTION,
      };

      it('should render default profile', () => {
        const { queryAllByTestId, getByTestId } = render(
          <Cv profile={emptyProps} />
        );
        expect(queryAllByTestId('cv/root').length).toEqual(1);
        expect(getByTestId('section/header-title').textContent).toEqual(
          'Profile'
        );
      });

      it('should render with provided title', () => {
        const titleProps = { title: TEST_TITLE };
        const { queryAllByTestId, getByTestId } = render(
          <Cv profile={titleProps} />
        );
        expect(queryAllByTestId('cv/root').length).toEqual(1);
        expect(getByTestId('section/header-title').textContent).toEqual(
          TEST_TITLE
        );
      });

      it('should render with provided title, icon', () => {
        const titleProps = { title: TEST_TITLE, icon: TEST_ICON };
        const { queryAllByTestId, getByTestId } = render(
          <Cv profile={titleProps} />
        );
        expect(queryAllByTestId('cv/root').length).toEqual(1);
        expect(getByTestId('section/header-title').textContent).toEqual(
          TEST_TITLE
        );
      });

      it('should render full profile', () => {
        const { queryAllByTestId, getByTestId } = render(
          <Cv profile={allProfileProps} />
        );
        expect(queryAllByTestId('cv/root').length).toEqual(1);
        expect(getByTestId('section/header-title').textContent).toEqual(
          TEST_TITLE
        );
        expect(getByTestId('cv/profile-description').textContent).toEqual(
          TEST_DESCRIPTION
        );
      });
    });
  });
});
