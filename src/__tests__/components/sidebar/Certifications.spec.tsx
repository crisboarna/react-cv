import { render } from "@testing-library/react";
import Certifications from "../../../components/sidebar/Certifications";

describe("Certifications", () => {
  const TEST_TITLE = "TEST_TILE";
  const TEST_CERT_NAME = "TEST_CERT_NAME";
  const TEST_CERT_DESC = "TEST_CERT_DESC";
  const TEST_CERT = {
    name: TEST_CERT_NAME,
    description: TEST_CERT_DESC,
    icon: "fab fa-aws",
  };
  const TEST_LIST = [TEST_CERT];

  it("should render without props", () => {
    const { getByTestId, queryAllByTestId } = render(<Certifications />);
    expect(queryAllByTestId("certifications/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/title").length).toEqual(1);
    expect(queryAllByTestId("certifications/item").length).toEqual(0);
    expect(queryAllByTestId("certifications/item-icon").length).toEqual(0);
    expect(queryAllByTestId("certifications/item-description").length).toEqual(
      0
    );
    expect(getByTestId("certifications/title").textContent).toEqual(" ");
    expect(getByTestId("certifications/icon").className).toEqual("fas fa-book");
  });

  it("should render with title", () => {
    const { getByTestId, queryAllByTestId } = render(
      <Certifications title={TEST_TITLE} />
    );
    expect(queryAllByTestId("certifications/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/title").length).toEqual(1);
    expect(queryAllByTestId("certifications/item").length).toEqual(0);
    expect(queryAllByTestId("certifications/item-icon").length).toEqual(0);
    expect(queryAllByTestId("certifications/item-description").length).toEqual(
      0
    );
    expect(getByTestId("certifications/title").textContent).toEqual(
      ` ${TEST_TITLE}`
    );
    expect(getByTestId("certifications/icon").className).toEqual("fas fa-book");
  });

  it("should render with title and certifications", () => {
    const { getByTestId, queryAllByTestId } = render(
      <Certifications list={TEST_LIST} title={TEST_TITLE} />
    );
    expect(queryAllByTestId("certifications/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/title").length).toEqual(1);
    expect(queryAllByTestId("certifications/item").length).toEqual(1);
    expect(queryAllByTestId("certifications/item-icon").length).toEqual(1);
    expect(queryAllByTestId("certifications/item-description").length).toEqual(
      1
    );
    expect(getByTestId("certifications/title").textContent).toEqual(
      ` ${TEST_TITLE}`
    );
    expect(getByTestId("certifications/item-icon").className).toEqual(
      "fab fa-aws certification-icon"
    );
    expect(getByTestId("certifications/item").textContent).toEqual(
      `${TEST_CERT_NAME}· ${TEST_CERT_DESC}`
    );
    expect(getByTestId("certifications/item-description").textContent).toEqual(
      `· ${TEST_CERT_DESC}`
    );
  });
});
