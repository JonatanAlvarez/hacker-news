import './CardNews.scss';

import { ReactComponent as Time } from '../../assets/icon-time.svg';
import ButtonFavorite from '../ButtonFavorite/ButtonFavorite';
import howLongAgo from '../../helpers/howLongAgo';

type Props = {
  publishedDate: string,
  author: string,
  title: string,
  isFavorite?: boolean,
  onClick?: () => void,
  onFavorite?: (isFavorite: boolean) => void
}

const CardNews = ({
  publishedDate,
  title = '',
  author,
  isFavorite = false,
  onClick = () => {},
  onFavorite = () => {}
}: Props) => {
  
  // rederDate - if the date is the current day, calculates the elapsed time so far.
  const renderDate = () => {
    return howLongAgo(new Date(publishedDate)) + ' by ' + author;
  }

  return (
    <div className="CardNews" onClick={onClick}>
      <div className="content">
        <small><Time /> { renderDate() }</small>
        <p>{ title }</p>
      </div>
      <div className="action">
        <ButtonFavorite active={isFavorite} onClick={onFavorite} />
      </div>
    </div>
  )
};

export default CardNews;