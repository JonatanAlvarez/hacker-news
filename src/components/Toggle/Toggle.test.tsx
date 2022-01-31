import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Toggle from './Toggle';

afterEach(cleanup);

describe("Testing Toggle Component", () => {

  test('has correct change state', () => {
    let state = false;
    const setState = jest.fn((e) => { state = e });
    const { getByRole } = render(
      <Toggle isActive={state} onClick={setState}>Test</Toggle>
    );

    userEvent.click(getByRole('button'));

    expect(state).toBe(true);
  });
});
