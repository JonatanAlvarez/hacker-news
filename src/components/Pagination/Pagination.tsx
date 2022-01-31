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
  const numbersShow = pagesShow - 4;
  const totalPages = Math.ceil(total / pagesSize);

  // renderElements - shows the controls according to the maximum number that can be displayed
  const renderElements = () => {
    const elements = [];
    let start = currentPage - (numbersShow / 2);
    
    if (start <= 0) {
      start = 1;
    }

    if (start >= 3) {
      elements.push(
        <button key="first" onClick={() => onChange(1)}>1</button>
      )
    }

    if (start >= 2) {
      elements.push(
        <button key="before" onClick={() => onChange(currentPage - (numbersShow / 2) - 1)}>...</button>
      )
    }

    for(let page=0; page < numbersShow && page + start <= totalPages; page++) {
      elements.push(
        <button
          key={page + start}
          className={cx({'active': page + start === currentPage})}
          onClick={() => onChange(page + start)}
        >
          { page + start }
        </button>
      );
    }

    if (start + numbersShow < totalPages) {
      elements.push(
        <button key="after" onClick={() => onChange(currentPage + (numbersShow / 2))}>...</button>
      )
    }

    if (start + numbersShow <= totalPages) {
      elements.push(
        <button key="last" onClick={() => onChange(totalPages)}>{ totalPages }</button>
      )
    }

    return elements;
  }

  return (
    <div className="Pagination">
      <button
        key="back"
        className={cx('back', {'show': currentPage > 1})}
        onClick={() => onChange(currentPage - 1)}
      />
      { renderElements() }
      <button
        key="next"
        className={cx('next', {'show': currentPage < totalPages - 1})}
        onClick={() => onChange(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;