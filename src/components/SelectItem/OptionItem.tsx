type Props = {
  value: string,
  selected?: boolean,
  onClick?: (value: string) => void,
  children: string | JSX.Element
}

function OptionItem({ value, selected=false, onClick = () => {}, children }: Props) {
  if (selected) {
    onClick(value);
  }

  return (
    <li onClick={() => { onClick(value) }}>
      { children }
    </li>
  )
};

export default OptionItem;