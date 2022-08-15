import { AiOutlineCheck, AiOutlineLoading } from 'react-icons/ai'
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
  key?:string,
  success?: boolean 
}

const Button:FC<Props> = ({ success=false,text,key,onClick,type,isLoading,className,RightIcon,LeftIcon,style }) => {

  const onClickHandler = () => {
    // if not loading, emit the event
    if(!isLoading && onClick) {
      onClick()
    }
  }

  if(success)
  return (
    <button key={key} data-testid="btn" onClick={onClickHandler} style={style} className={` ${type} Button bg-gradient-to-l from-green-700 to-green-600`}>
          <AiOutlineCheck  className="text-white" /> 
    </button>
  )

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