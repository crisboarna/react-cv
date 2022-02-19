import { render } from "@testing-library/react";
import Education from "../../../components/sidebar/Education";

describe("Education", () => {
  const TEST_TITLE = "TEST_TILE";
  const TEST_SCHOOL = "TEST_SCHOOL";
  const TEST_DEGREE = "TEST_DEGREE";
  const TEST_DATE = "TEST_DATE";
  const TEST_COURSES = "TEST_COURSES";
  const TEST_LIST = [
    {
      school: TEST_SCHOOL,
      degree: TEST_DEGREE,
      date: TEST_DATE,
      courses: TEST_COURSES,
    },
  ];

  it("should render with title and education", () => {
    const { getByTestId } = render(
      <Education list={TEST_LIST} title={TEST_TITLE} />
    );

    expect(getByTestId("education/container")).toBeDefined();
    expect(getByTestId("education/icon").className).toEqual(
      "fas fa-graduation-cap"
    );
    expect(getByTestId("education/item-school").textContent).toEqual(
      TEST_SCHOOL
    );
    expect(getByTestId("education/item-degree").textContent).toEqual(
      TEST_DEGREE
    );
    expect(getByTestId("education/item-date").textContent).toEqual(TEST_DATE);
    expect(getByTestId("education/item-courses").textContent).toEqual(
      `· Courses: ${TEST_COURSES}`
    );
  });
});
