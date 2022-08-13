import React, { FC, memo, ReactNode } from 'react'
import { IconType } from 'react-icons'
import './InputField.css'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  onChange?: (value:string) => void,
  IconProp?: ReactNode,
  Icon?: IconType,
  label: string,
  error?: string,
  value?: string,
  register: any,
}

const InputField:FC<Props> = ({ onChange,Icon,register,error,label,IconProp, ...rest }) => {
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
      <p className='inputError truncate'>{error || null}</p>
    </div>
  )
}

export default memo(InputField)
