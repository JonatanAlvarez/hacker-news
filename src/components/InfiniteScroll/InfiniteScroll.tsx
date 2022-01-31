import "./InfiniteScroll.scss";

import { ReactComponent as Loader } from '../../assets/loader.svg';
import { useEffect, useState } from "react";

import { ReactComponent as ArrowUP } from "../../assets/up-arrow.svg";

type Props = {
  isLoading: boolean,
  onClick: () => void
}

const InfiniteScroll = ({ isLoading= false, onClick= () => {} }: Props) => {
  const [btnTop, setBtnTop] = useState(false);

  useEffect(() => {
    const detectBottomScroll = function() {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isLoading) {
        onClick();
      }

      if(document.body.offsetHeight > (window.innerHeight * 2) && window.scrollY > window.innerHeight) {
        setBtnTop(true);
      } else {
        setBtnTop(false);
      }
    };

    document.addEventListener('scroll', detectBottomScroll);

    return () => {
      document.removeEventListener('scroll', detectBottomScroll);
    }
  }, [isLoading, onClick]);

  const renderButtonTop = () => {
    if (btnTop) {
      return <button className="btnTop" onClick={
        () => {
          window.scroll({top: 0, left: 0, behavior: 'smooth' });
        }
      }><ArrowUP /></button>
    }
    return <></>
  };

  return (
    <div className="InfiniteScroll">
      { renderButtonTop() }
      { isLoading
        ? <Loader />
        : <button onClick={onClick}>Load More</button>
      }
    </div>
  )
};

export default InfiniteScroll;