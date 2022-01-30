import cx from "classnames";

import "./Toggle.scss";

type Props = {
  isActive: boolean,
  children: string,
  onClick: (isActive: boolean) => void
}

const Toggle = ({ isActive= false, children, onClick= () => {}}: Props) => (
  <button className={cx('Toggle', { 'active': isActive })} onClick={() => onClick(!isActive)}>
    { children }
  </button>
);

export default Toggle;