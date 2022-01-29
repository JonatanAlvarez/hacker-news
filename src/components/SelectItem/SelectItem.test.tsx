import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import OptionItem from './OptionItem';
import SelectItem from './SelectItem';

afterEach(cleanup);

describe("Testing SelectItem Component", () => {

  test('has correct select value item', () => {
    let state = '';
    const setState = jest.fn((e) => { state = e });
    const { getByText } = render(
      <SelectItem placeholder="Select a Item" onChange={setState}>
        <OptionItem value="1">Test 1</OptionItem>
        <OptionItem value="2">Test 2</OptionItem>
        <OptionItem value="3">Test 3</OptionItem>
      </SelectItem>
    );

    userEvent.click(getByText('Select a Item'));
    userEvent.click(getByText('Test 2'));

    expect(state).toBe('2');
  });

  test('has correct show select item', () => {
    let state = '3';
    const { getByRole } = render(
      <SelectItem value={state} placeholder="Select a Item">
        <OptionItem value="1">Test 1</OptionItem>
        <OptionItem value="2">Test 2</OptionItem>
        <OptionItem value="3">Test 3</OptionItem>
      </SelectItem>
    );

    expect(getByRole('combobox')).toHaveTextContent('Test 3');
  });
});
