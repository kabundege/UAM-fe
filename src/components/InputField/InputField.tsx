import React, { FC, memo, ReactNode } from 'react'
import { IconType } from 'react-icons'
import './InputField.css'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  onChange?: (value:string) => void,
  IconProp?: ReactNode,
  Icon?: IconType,
  label: string,
  labelClassName?: string,
  error?: string,
  value?: string,
  register: any,
}

const InputField:FC<Props> = ({ onChange,Icon,register,error,label,IconProp, labelClassName, ...rest }) => {
  return (
    <div key={label} className='InputField'>
      <label className="capitalize">{label}</label>
      <div className='InputWrapper'>
        <input 
          {...rest}
          {...register}
        />
        { Icon ? <Icon className="icon" /> : null}
        { IconProp ? IconProp : null }
      </div>
      <div className={labelClassName}>
        <p className="inputError">{error || null}</p>
      </div>
    </div>
  )
}

export default memo(InputField)
