import { AiOutlineLoading } from 'react-icons/ai'
import { CSSProperties, FC, ReactNode } from 'react';
import './Button.css';

interface Props {
  text: any,
  isLoading?: boolean,
  onClick?: () => void,
  type?: 'primary' | 'secondary' | 'muted' | 'danger',
  className?: string,
  LeftIcon?: ReactNode,
  RightIcon?: ReactNode,
  style?: CSSProperties,
  key?:string
}

const Button:FC<Props> = ({ text,key,onClick,type,isLoading,className,RightIcon,LeftIcon,style }) => {

  const onClickHandler = () => {
    // if not loading, emit the event
    if(!isLoading && onClick) {
      onClick()
    }
  }

  return (
    <button key={key} data-testid="btn" onClick={onClickHandler} style={style} className={` ${type} Button bg-gradient-to-l from-primary to-primary-dark  ${className}`}>
      {LeftIcon}
      {
        isLoading ?
          <AiOutlineLoading 
            className="loadingIcon mr-2 " 
            /> : 
          text
      }
      {RightIcon}
    </button>
  )
}

export default Button