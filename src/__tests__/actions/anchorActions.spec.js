import {hideAnchors, HIDE_ANCHOR, showAnchors, SHOW_ANCHOR} from "../../actions/anchorActions";

describe('anchorActions', () => {
  it('hideAnchors should create HIDE_ANCHORS action', () => {
    expect(hideAnchors()).toEqual({type: HIDE_ANCHOR});
  });

  it('showAnchors should create SHOW_ANCHORS action', () => {
    expect(showAnchors()).toEqual({type: SHOW_ANCHOR});
  });
});