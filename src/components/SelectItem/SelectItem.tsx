import { cloneElement, useState } from "react";

import './SelectItem.scss';

type Props = {
  value?: string,
  placeholder?: String,
  children: JSX.Element[],
  onChange?: (value:string) => void,
};

const SelectItem = ({ value, placeholder = 'Select Item', children, onChange = () => {}}: Props) => {
  const [opened, setOpened] = useState(false);

  const handdleSelected = (value?: string) => {
    if (value) onChange(value);
    setOpened(!opened);
  };

  const renderItemSelected = () => {
    let itemSelected;
    
    children.map((item) => {
      if (item.props.value === value) itemSelected = item.props.children;
      return '';
    })
    
    return itemSelected || placeholder
  }

  return (
    <div className="SelectItem">
      <div className="selected" onClick={() => { setOpened(!opened) }}>
        { renderItemSelected() }
      </div>
      {
        opened && 
        <ul className="options">
          {
            children.map((child) => {
              return cloneElement(child, { onClick:handdleSelected });
            })
          }
        </ul>
      }
    </div>
  )
};

export default SelectItem;