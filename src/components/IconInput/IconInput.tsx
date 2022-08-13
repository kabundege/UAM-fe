import { CSSProperties, FC, HTMLInputTypeAttribute } from 'react'
import { IconType } from 'react-icons'
import './IconInput.css'

interface Props {
  onChange: (value:string) => void,
  placeholder: string,
  required?: boolean,
  readOnly?: boolean,
  Icon?: IconType,
  value?: string,
  type?: HTMLInputTypeAttribute,
  style?: CSSProperties
}

const IconInput:FC<Props> = ({ type,placeholder,value,required,onChange,Icon,readOnly,style }) => (
  <div className='SimpleInput' style={style} >
    { Icon ? <Icon className="icon" /> : null}
    <input 
      onChange={e => onChange(e.currentTarget.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      value={value}
      type={type}
    />
  </div>
)


export default IconInput
