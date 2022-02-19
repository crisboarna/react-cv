import { render } from "@testing-library/react";
import Category from "../../../components/common/Category";

describe("Category", () => {
  const TEST_TITLE = "TEST_TITLE";
  const TEST_ICON = "TEST_ICON";
  const TEST_DATE = "TEST_DATE";
  const TEST_SUBTITLE = "TEST_SUBTITLE";
  const TEST_SUBTITLE_LINK = "TEST_SUBTITLE_LINK";
  const TEST_SUBTITLE_DETAIL = "TEST_SUBTITLE_DETAIL";
  const TEST_DESCRIPTION1 = "TEST_DESCRIPTION1";
  const TEST_DESCRIPTION2 = "TEST_DESCRIPTION2";
  const TEST_DESCRIPTION = [TEST_DESCRIPTION1, TEST_DESCRIPTION2];
  const TEST_TAG1 = "TEST_TAG1";
  const TEST_TAG2 = "TEST_TAG2";
  const TEST_TAGS = [TEST_TAG1, TEST_TAG2];
  const TEST_LIST = [
    {
      title: TEST_TITLE,
      date: TEST_DATE,
      subtitle: TEST_SUBTITLE,
      subtitleLink: TEST_SUBTITLE_LINK,
      subtitleDetail: TEST_SUBTITLE_DETAIL,
    },
  ];

  it("should render without crashing", () => {
    const { queryAllByTestId } = render(<Category />);
    expect(queryAllByTestId("category/section").length).toEqual(0);
    expect(queryAllByTestId("category/item").length).toEqual(0);
    expect(queryAllByTestId("category/header").length).toEqual(0);
    expect(queryAllByTestId("category/header-anchor").length).toEqual(0);
  });

  it("should render with given title, default icon", () => {
    const { getByTestId, queryAllByTestId } = render(
      <Category title={TEST_TITLE} />
    );
    expect(getByTestId("section/header-title").textContent).toEqual(TEST_TITLE);
    expect(getByTestId("section/header-icon").className).toEqual("fa fa-user");
    expect(queryAllByTestId("category/item").length).toEqual(0);
  });

  it("should render with given title and icon", () => {
    const { getByTestId, queryAllByTestId } = render(
      <Category title={TEST_TITLE} icon={TEST_ICON} />
    );
    expect(getByTestId("section/header-title").textContent).toEqual(TEST_TITLE);
    expect(getByTestId("section/header-icon").className).toEqual(
      `fa fa-${TEST_ICON}`
    );
    expect(queryAllByTestId("category/item").length).toEqual(0);
  });

  it("should render with given title, icon, empty list", () => {
    const { getByTestId, queryAllByTestId } = render(
      <Category title={TEST_TITLE} icon={TEST_ICON} list={[]} />
    );
    expect(getByTestId("section/header-title").textContent).toEqual(TEST_TITLE);
    expect(getByTestId("section/header-icon").className).toEqual(
      `fa fa-${TEST_ICON}`
    );
    expect(queryAllByTestId("category/item").length).toEqual(0);
  });

  it("should render with given title, icon, list with no description, tags", () => {
    const { getByTestId, queryAllByTestId, getByText } = render(
      <Category title={TEST_TITLE} icon={TEST_ICON} list={TEST_LIST} />
    );
    expect(getByTestId("section/header-title").textContent).toEqual(TEST_TITLE);
    expect(getByTestId("section/header-icon").className).toEqual(
      `fa fa-${TEST_ICON}`
    );
    expect(queryAllByTestId("category/item").length).toEqual(1);
    expect(getByText(TEST_SUBTITLE)).toBeDefined();
    expect(getByText(TEST_DATE)).toBeDefined();
  });

  it("should render with given icon, list with no subtitle, description, tags", () => {
    const TEST_LIST_PRIVATE = [
      {
        title: TEST_TITLE,
        date: TEST_DATE,
        subtitleLink: TEST_SUBTITLE_LINK,
        subtitleDetail: TEST_SUBTITLE_DETAIL,
      },
    ];
    const { getByTestId, queryAllByTestId, getByText, queryAllByText } = render(
      <Category title={TEST_TITLE} icon={TEST_ICON} list={TEST_LIST_PRIVATE} />
    );
    expect(getByTestId("section/header-title").textContent).toEqual(TEST_TITLE);
    expect(getByTestId("section/header-icon").className).toEqual(
      `fa fa-${TEST_ICON}`
    );
    expect(queryAllByTestId("category/item").length).toEqual(1);
    expect(queryAllByText(TEST_SUBTITLE).length).toEqual(0);
    expect(getByText(TEST_DATE)).toBeDefined();
    expect(queryAllByText(TEST_SUBTITLE_LINK).length).toEqual(0);
    expect(queryAllByText(TEST_SUBTITLE_DETAIL).length).toEqual(0);
  });

  it("should render with given icon, list, description and no tags", () => {
    const TEST_LIST_PRIVATE = [
      {
        title: TEST_TITLE,
        date: TEST_DATE,
        subtitleLink: TEST_SUBTITLE_LINK,
        subtitleDetail: TEST_SUBTITLE_DETAIL,
        description: TEST_DESCRIPTION,
      },
    ];
    const { getByTestId, queryAllByTestId, getByText, queryAllByText } = render(
      <Category title={TEST_TITLE} icon={TEST_ICON} list={TEST_LIST_PRIVATE} />
    );
    expect(getByTestId("section/header-title").textContent).toEqual(TEST_TITLE);
    expect(getByTestId("section/header-icon").className).toEqual(
      `fa fa-${TEST_ICON}`
    );
    expect(queryAllByTestId("category/item").length).toEqual(1);
    expect(queryAllByText(TEST_SUBTITLE).length).toEqual(0);
    expect(getByText(TEST_DATE)).toBeDefined();
    expect(queryAllByText(TEST_SUBTITLE_LINK).length).toEqual(0);
    expect(queryAllByText(TEST_SUBTITLE_DETAIL).length).toEqual(0);
    expect(queryAllByText(`· ${TEST_DESCRIPTION1}`).length).toEqual(1);
    expect(queryAllByText(`· ${TEST_DESCRIPTION2}`).length).toEqual(1);
  });

  it("should render with given icon, list, description, tags", () => {
    const TEST_LIST_PRIVATE = [
      {
        title: TEST_TITLE,
        date: TEST_DATE,
        subtitleLink: TEST_SUBTITLE_LINK,
        subtitleDetail: TEST_SUBTITLE_DETAIL,
        description: TEST_DESCRIPTION,
        tags: TEST_TAGS,
      },
    ];
    const { getByTestId, queryAllByTestId, getByText, queryAllByText } = render(
      <Category title={TEST_TITLE} icon={TEST_ICON} list={TEST_LIST_PRIVATE} />
    );
    expect(getByTestId("section/header-title").textContent).toEqual(TEST_TITLE);
    expect(getByTestId("section/header-icon").className).toEqual(
      `fa fa-${TEST_ICON}`
    );
    expect(queryAllByTestId("category/item").length).toEqual(1);
    expect(queryAllByText(TEST_SUBTITLE).length).toEqual(0);
    expect(getByText(TEST_DATE)).toBeDefined();
    expect(queryAllByText(TEST_SUBTITLE_LINK).length).toEqual(0);
    expect(queryAllByText(TEST_SUBTITLE_DETAIL).length).toEqual(1);
    expect(queryAllByText(`· ${TEST_DESCRIPTION1}`).length).toEqual(1);
    expect(queryAllByText(`· ${TEST_DESCRIPTION2}`).length).toEqual(1);
    expect(queryAllByText(TEST_TAG1).length).toEqual(1);
    expect(queryAllByText(TEST_TAG2).length).toEqual(1);
  });
});
