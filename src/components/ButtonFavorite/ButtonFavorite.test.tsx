import { cleanup, render, } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import ButtonFavorite from './ButtonFavorite';

afterEach(cleanup);

describe("Testing ButtonFavorite Component", () => {

  test('has correct change state', () => {
    let state = false;
    const setState = jest.fn((e) => { state = e });
    const { getByRole } = render(
      <ButtonFavorite onClick={setState} />
    );

    userEvent.click(getByRole('button'));

    expect(state).toBe(true);
  });
});
