import "./InfiniteScroll.scss";

import { ReactComponent as Loader } from '../../assets/loader.svg';
import { useEffect } from "react";

type Props = {
  isLoading: boolean,
  onClick: () => void
}

const InfiniteScroll = ({ isLoading= false, onClick= () => {} }: Props) => {

  useEffect(() => {
    const detectBottomScroll = function() {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isLoading) {
        onClick();
      }
    };

    document.addEventListener('scroll', detectBottomScroll);

    return () => {
      document.removeEventListener('scroll', detectBottomScroll);
    }
  }, [isLoading, onClick]);

  return (
    <div className="InfiniteScroll">
      { isLoading
        ? <Loader />
        : <button onClick={onClick}>Load More</button>
      }
    </div>
  )
};

export default InfiniteScroll;