import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import InfiniteScroll from './InfiniteScroll';

afterEach(cleanup);

describe("Testing InfiniteScroll Component", () => {

  test('has correct tigger event', () => {
    let state = false;
    const setState = jest.fn(() => { state = true });
    const { getByRole } = render(
      <InfiniteScroll isLoading={false} onClick={setState} />
    );

    userEvent.click(getByRole('button'));

    expect(state).toBe(true);
  });

  test('has hidden button when loading', () => {
    const setState = jest.fn();
    const { queryByRole } = render(
      <InfiniteScroll isLoading={true} onClick={setState} />
    );
    
    expect(queryByRole('button')).toBeNull();
  });
});
