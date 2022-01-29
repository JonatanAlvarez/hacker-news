import cx from 'classnames';

import './ButtonFavorite.scss';

import { ReactComponent as Favorite } from '../../assets/icon-favorite.svg';
import { ReactComponent as FavoriteActive } from '../../assets/icon-favorite-fill.svg';

type Props = {
  active?: boolean,
  onClick?: (active: boolean) => void
};

const ButtonFavorite = ({active = false, onClick = () => {}}: Props) => (
  <button
    className={
      cx('ButtonFavorite', {'active': active})
    }
    onClick={() => onClick(!active)}
  >
    { active ? <FavoriteActive /> : <Favorite /> }
  </button>
);

export default ButtonFavorite;