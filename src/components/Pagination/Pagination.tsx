import cx from 'classnames';

import './Pagination.scss';

type Props = {
  currentPage?: number, // place the bookmark on the current page
  pagesSize?: number, // Number of elements that each page should display
  pagesShow?: number, // maximum number of controls to display
  total?: number, // Total elements to distribute between the pages
  onChange: (page: number) => void // event that fires every time the user changes the bookmark of the current page
};

const Pagination =  ({ currentPage=1, pagesSize=10, pagesShow=10, total=0, onChange }: Props) => {
  const numbersShow = pagesShow - 2;
  const totalPages = total / pagesSize;

  // renderElements - shows the controls according to the maximum number that can be displayed
  const renderElements = () => {
    const elements = [];
    let start = currentPage - (numbersShow / 2);
    
    if (start <= 0) {
      start = 1;
    }

    if (start >= 2) {
      elements.push(
        <button onClick={() => onChange(currentPage - (numbersShow / 2) - 1)}>...</button>
      )
    }

    for(let page=0; page < numbersShow && page + start <= totalPages; page++) {
      elements.push(
        <button
          key={page}
          className={cx({'active': page + start === currentPage})}
          onClick={() => onChange(page + start)}
        >
          { page + start }
        </button>
      );
    }

    if (start + numbersShow < totalPages) {
      elements.push(
        <button onClick={() => onChange(currentPage + (numbersShow / 2))}>...</button>
      )
    }

    return elements;
  }

  return (
    <div className="Pagination">
      <button
        className={cx('back', {'show': currentPage > 1})}
        onClick={() => onChange(currentPage - 1)}
      />
      { renderElements() }
      <button
        className={cx('next', {'show': currentPage < totalPages - 1})}
        onClick={() => onChange(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;