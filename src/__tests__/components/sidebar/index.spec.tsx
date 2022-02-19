import { render } from "@testing-library/react";
import Sidebar from "../../../components/sidebar/index";

describe("Sidebar", () => {
  const TEST_PROPS = {};

  it("should render without props", () => {
    const { queryAllByTestId } = render(<Sidebar />);
    expect(queryAllByTestId("sidebar/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/container").length).toEqual(0);
    expect(queryAllByTestId("contact/container").length).toEqual(0);
    expect(queryAllByTestId("education/container").length).toEqual(0);
    expect(queryAllByTestId("interests/container").length).toEqual(0);
    expect(queryAllByTestId("language/container").length).toEqual(0);
    expect(queryAllByTestId("name/container").length).toEqual(0);
    expect(queryAllByTestId("skills/container").length).toEqual(0);
  });

  it("should render no sidebar given children", () => {
    const { queryAllByTestId } = render(<Sidebar>TEST</Sidebar>);
    expect(queryAllByTestId("sidebar/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/container").length).toEqual(0);
    expect(queryAllByTestId("contact/container").length).toEqual(0);
    expect(queryAllByTestId("education/container").length).toEqual(0);
    expect(queryAllByTestId("interests/container").length).toEqual(0);
    expect(queryAllByTestId("language/container").length).toEqual(0);
    expect(queryAllByTestId("name/container").length).toEqual(0);
    expect(queryAllByTestId("skills/container").length).toEqual(0);
  });

  it("should render with certifications", () => {
    const { queryAllByTestId } = render(
      <Sidebar certifications={TEST_PROPS} />
    );
    expect(queryAllByTestId("sidebar/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/container").length).toEqual(1);
    expect(queryAllByTestId("contact/container").length).toEqual(0);
    expect(queryAllByTestId("education/container").length).toEqual(0);
    expect(queryAllByTestId("interests/container").length).toEqual(0);
    expect(queryAllByTestId("language/container").length).toEqual(0);
    expect(queryAllByTestId("name/container").length).toEqual(0);
    expect(queryAllByTestId("skills/container").length).toEqual(0);
  });

  it("should render with contact", () => {
    const { queryAllByTestId } = render(<Sidebar contact={TEST_PROPS} />);
    expect(queryAllByTestId("sidebar/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/container").length).toEqual(0);
    expect(queryAllByTestId("contact/container").length).toEqual(1);
    expect(queryAllByTestId("education/container").length).toEqual(0);
    expect(queryAllByTestId("interests/container").length).toEqual(0);
    expect(queryAllByTestId("language/container").length).toEqual(0);
    expect(queryAllByTestId("name/container").length).toEqual(0);
    expect(queryAllByTestId("skills/container").length).toEqual(0);
  });

  it("should render with education", () => {
    const { queryAllByTestId } = render(<Sidebar education={TEST_PROPS} />);
    expect(queryAllByTestId("sidebar/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/container").length).toEqual(0);
    expect(queryAllByTestId("contact/container").length).toEqual(0);
    expect(queryAllByTestId("education/container").length).toEqual(1);
    expect(queryAllByTestId("interests/container").length).toEqual(0);
    expect(queryAllByTestId("language/container").length).toEqual(0);
    expect(queryAllByTestId("name/container").length).toEqual(0);
    expect(queryAllByTestId("skills/container").length).toEqual(0);
  });

  it("should render with interests", () => {
    const { queryAllByTestId } = render(<Sidebar interests={TEST_PROPS} />);
    expect(queryAllByTestId("sidebar/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/container").length).toEqual(0);
    expect(queryAllByTestId("contact/container").length).toEqual(0);
    expect(queryAllByTestId("education/container").length).toEqual(0);
    expect(queryAllByTestId("interests/container").length).toEqual(1);
    expect(queryAllByTestId("language/container").length).toEqual(0);
    expect(queryAllByTestId("name/container").length).toEqual(0);
    expect(queryAllByTestId("skills/container").length).toEqual(0);
  });

  it("should render with languages", () => {
    const { queryAllByTestId } = render(<Sidebar languages={TEST_PROPS} />);
    expect(queryAllByTestId("sidebar/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/container").length).toEqual(0);
    expect(queryAllByTestId("contact/container").length).toEqual(0);
    expect(queryAllByTestId("education/container").length).toEqual(0);
    expect(queryAllByTestId("interests/container").length).toEqual(0);
    expect(queryAllByTestId("language/container").length).toEqual(1);
    expect(queryAllByTestId("name/container").length).toEqual(0);
    expect(queryAllByTestId("skills/container").length).toEqual(0);
  });

  it("should render with name", () => {
    const { queryAllByTestId } = render(<Sidebar name={TEST_PROPS} />);
    expect(queryAllByTestId("sidebar/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/container").length).toEqual(0);
    expect(queryAllByTestId("contact/container").length).toEqual(0);
    expect(queryAllByTestId("education/container").length).toEqual(0);
    expect(queryAllByTestId("interests/container").length).toEqual(0);
    expect(queryAllByTestId("language/container").length).toEqual(0);
    expect(queryAllByTestId("name/container").length).toEqual(1);
    expect(queryAllByTestId("skills/container").length).toEqual(0);
  });

  it("should render with skills", () => {
    const { queryAllByTestId } = render(<Sidebar skills={TEST_PROPS} />);
    expect(queryAllByTestId("sidebar/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/container").length).toEqual(0);
    expect(queryAllByTestId("contact/container").length).toEqual(0);
    expect(queryAllByTestId("education/container").length).toEqual(0);
    expect(queryAllByTestId("interests/container").length).toEqual(0);
    expect(queryAllByTestId("language/container").length).toEqual(0);
    expect(queryAllByTestId("name/container").length).toEqual(0);
    expect(queryAllByTestId("skills/container").length).toEqual(1);
  });

  it("should render with all", () => {
    const { queryAllByTestId } = render(
      <Sidebar
        certifications={TEST_PROPS}
        contact={TEST_PROPS}
        education={TEST_PROPS}
        interests={TEST_PROPS}
        languages={TEST_PROPS}
        name={TEST_PROPS}
        skills={TEST_PROPS}
      />
    );
    expect(queryAllByTestId("sidebar/container").length).toEqual(1);
    expect(queryAllByTestId("certifications/container").length).toEqual(1);
    expect(queryAllByTestId("contact/container").length).toEqual(1);
    expect(queryAllByTestId("education/container").length).toEqual(1);
    expect(queryAllByTestId("interests/container").length).toEqual(1);
    expect(queryAllByTestId("language/container").length).toEqual(1);
    expect(queryAllByTestId("name/container").length).toEqual(1);
    expect(queryAllByTestId("skills/container").length).toEqual(1);
  });
});
