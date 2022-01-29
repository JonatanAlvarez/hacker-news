import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Pagination from './Pagination';

afterEach(cleanup);

describe("Testing Pagination Component", () => {

  test('has correct change state', () => {
    let page = 0;
    const setState = jest.fn((e) => { page = e });
    const { getByText } = render(
      <Pagination onChange={setState} total={100} />
    );

    userEvent.click(getByText('5'));

    expect(page).toBe(5);
  });
});