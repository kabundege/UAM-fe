import { AiOutlineCheck, AiOutlineLoading } from 'react-icons/ai'
import { CSSProperties, FC, ReactNode } from 'react';
import './Button.css';

interface Props {
  text: any,
  isLoading?: boolean,
  onClick?: () => void,
  type?: 'primary' | 'secondary' | 'muted' | 'danger' | 'transparent',
  className?: string,
  LeftIcon?: ReactNode,
  RightIcon?: ReactNode,
  style?: CSSProperties,
  key?:string,
  disabled?:boolean,
  success?:boolean
}

export const btnStyle = "bg-gradient-to-l from-primary to-primary-dark rounded-md py-2 px-8 font-Medium text-lg text-white cursor-pointer"

const Button:FC<Props> = ({ success=false,text,key,onClick,type,className,RightIcon,LeftIcon,style,disabled=false,isLoading=false }) => {

  const onClickHandler = () => {
    // if not loading, emit the event
    if(!isLoading && onClick) {
      onClick()
    }
  }

  const typeBasedStyles = () => {
    switch(type){
      case "secondary":
        return "border border-MAIN_TEXT hover:border-transparent bg-transparent hover:bg-PRIMARY  text-MAIN_TEXT hover:text-white"
      case 'danger':
        return "bg-RED"
      case 'muted':
        return "bg-MUTED_TEXT "
      case "transparent":
        return "bg-transparent border-0 text-PRIMARY"
      default:
        break
    }
  }

  if(success)
  return (
    <button key={key} data-testid="btn" onClick={onClickHandler} style={style} className={` ${type} Button bg-gradient-to-l from-green-700 to-green-600`}>
      <AiOutlineCheck  className="text-white" /> 
    </button>
  )

  return (
    <button 
      key={key} 
      style={style} 
      data-testid="btn" 
      disabled={disabled}
      onClick={onClickHandler}
      className={`${btnStyle} ${type} Button ${typeBasedStyles()} ${className} relative flex items-center justify-center hover:opacity-90`}
    >
      {LeftIcon}
      <AiOutlineLoading 
          className={`animate-spin mx-2 my-1 absolute ${!isLoading && 'opacity-0'}`}
        /> 
      <label className={`${isLoading && 'opacity-0'}`}>
        {text}
      </label>
      {RightIcon}
    </button>
  )
}

export default Button
