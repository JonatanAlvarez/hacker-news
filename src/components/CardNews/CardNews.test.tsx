import { render, cleanup } from '@testing-library/react';
import CardNews from './CardNews';

afterEach(cleanup);

describe("Testing CardNews Component", () => {
  test('renders author and title', () => {
    const props = {
      publishedDate: "2022-01-28T14:05:58.000Z",
      author: "Stephen King",
      title: "Secret Window",
      comment: ''
    }
    const { getByText } = render(<CardNews { ...props } />);

    expect(getByText(/Stephen King/i)).toBeInTheDocument();
    expect(getByText(/Secret Window/i)).toBeInTheDocument();
  });

  test('renders author and comment', () => {
    const props = {
      publishedDate: "2022-01-28T14:05:58.000Z",
      author: "Stephen King",
      title: "",
      comment: "Hola mundo!"
    }
    const { getByText } = render(<CardNews { ...props } />);

    expect(getByText(/Stephen King/i)).toBeInTheDocument();
    expect(getByText(/Hola mundo!/i)).toBeInTheDocument();
  });
});
