import './CardNews.scss';

import { ReactComponent as Time } from '../../assets/icon-time.svg';
import { useState } from 'react';
import ButtonFavorite from '../ButtonFavorite/ButtonFavorite';

type Props = {
  publishedDate: string,
  author: string,
  title: string,
  comment: string
}

const CardNews = ({publishedDate, title = '', comment = '', author}: Props) => {
  const [active, setActive] = useState(false);
  
  // rederDate - if the date is the current day, calculates the elapsed time so far.
  const renderDate = () => {
    const today = new Date();
    const date = new Date(publishedDate);

    if (date.toDateString() === today.toDateString()) {
      const time = Math.round(Math.abs(today.getTime() - date.getTime()) / (1000 * 60));
      
      if (time >= 60) {
        const hours = Math.round(time / 60);

        return `${hours} ${(hours > 60 ? 'hours' : 'hour')} ago`;
      }

      return `${time} minutes ago`;
    }

    return date.toDateString();
  }

  return (
    <div className="CardNews">
      <div className="content">
        <small><Time /> { renderDate() } by { author }</small>
        <p>{ title || comment }</p>
      </div>
      <div className="action">
        <ButtonFavorite active={active} onClick={setActive} />
      </div>
    </div>
  )
};

export default CardNews;