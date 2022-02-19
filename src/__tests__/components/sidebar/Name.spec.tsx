import { render } from "@testing-library/react";
import Name from "../../../components/sidebar/Name";

describe("Name", () => {
  const TEST_TITLE = "TEST_TILE";
  const TEST_NAME = "TEST_NAME";

  it("should render with title, name", () => {
    const { getByTestId } = render(
      <Name name={TEST_NAME} title={TEST_TITLE} />
    );

    expect(getByTestId("name/h1").textContent).toEqual(TEST_NAME);
    expect(getByTestId("name/title").textContent).toEqual(` ${TEST_TITLE} `);
  });
});
