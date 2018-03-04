import { HIDE_ANCHOR, SHOW_ANCHOR } from '../../actions/anchorActions';
import action from '../../reducers/anchorReducer';

describe('anchorReducer', () => {
  it('default state', () => {
    expect(action(undefined, { type: 1 })).toEqual({ anchorVisible: true });
  });

  it('hiding state', () => {
    expect(action(undefined, { type: HIDE_ANCHOR })).toEqual({ anchorVisible: false });
  });

  it('showing state', () => {
    expect(action(undefined, { type: SHOW_ANCHOR })).toEqual({ anchorVisible: true });
  });
});
