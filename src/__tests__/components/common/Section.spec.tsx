import { render } from "@testing-library/react";
import Section from "../../../components/common/Section";

describe("Section", () => {
  const TEST_CLASS = "TEST_CLASS";
  const TEST_ICON = "TEST_ICON";
  const TEST_DESCRIPTION = "TEST_DESCRIPTION";
  const TEST_CHILDREN = "TEST_CHILDREN";

  describe("rendering", () => {
    it("should render basic empty section", () => {
      const { getByTestId, queryAllByTestId } = render(<Section />);
      expect(queryAllByTestId("section/header-title").length).toEqual(1);
      expect(queryAllByTestId("section/header-icon").length).toEqual(1);
      expect(getByTestId("section/header-icon").className).toEqual(
        "fa fa-user"
      );
    });

    it("should render with className, icon, title", () => {
      const { getByTestId, getByText, queryAllByTestId } = render(
        <Section
          className={TEST_CLASS}
          icon={TEST_ICON}
          title={TEST_DESCRIPTION}
        />
      );
      expect(queryAllByTestId("section/header-title").length).toEqual(1);
      expect(queryAllByTestId("section/header-icon").length).toEqual(1);
      expect(getByTestId("section/header-icon").className).toEqual(
        `fa fa-${TEST_ICON}`
      );
      expect(getByText(TEST_DESCRIPTION)).toBeDefined();
    });

    it("should render with className, icon, title, children", () => {
      const { getByTestId, getByText, queryAllByTestId } = render(
        <Section
          className={TEST_CLASS}
          icon={TEST_ICON}
          title={TEST_DESCRIPTION}
        >
          TEST_CHILDREN
        </Section>
      );
      expect(queryAllByTestId("section/header-title").length).toEqual(1);
      expect(queryAllByTestId("section/header-icon").length).toEqual(1);
      expect(getByTestId("section/header-icon").className).toEqual(
        `fa fa-${TEST_ICON}`
      );
      expect(getByText(TEST_DESCRIPTION)).toBeDefined();
      expect(getByText(TEST_CHILDREN)).toBeDefined();
    });
  });
});
