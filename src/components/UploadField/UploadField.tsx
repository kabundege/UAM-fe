import { FC, useRef } from 'react'
import { RiAttachment2 } from 'react-icons/ri'
import './UploadField.css'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  handleChange: (value:any) => void,
  error?: any,
  label: string,
  value?: any,
}

const UploadField:FC<Props> = ({ error,value,handleChange,label, ...rest }) => {
  const InputRef = useRef<HTMLInputElement|null>(null)

  const onClickHandler = () => {
    if(InputRef.current)
    InputRef.current.click()
  }

  const onChange = (e:React.FormEvent<HTMLInputElement>) => {
    // 
    if(e.currentTarget.files && e.currentTarget.files[0]){
      // check if multiple is in use!
      handleChange( 
        rest.multiple ? 
          e.currentTarget.files : 
          e.currentTarget.files[0]
      )
    }
  }

  const names = () => {
    let name = '';

    if(!value.length)
    return null

    // mapping all file names to appiel
    for(let i=0;i<value.length;i++){
      if(i)
      name += ', '
      name += value[i].name || value[i]
    }

    return name
  }

  return (
    <div className='UploadField'>
      <label className="capitalize">{label}</label>
      <div className='InputWrapper' onClick={onClickHandler}>
        <input
          type='file'
          ref={InputRef}
          onChange={onChange}
          {...rest}
        />
        {
          value ?
            <span className="truncate" style={{flex:.9}} >{ rest.multiple ? names() : value.name || value}</span>:
            <label>Upload File</label>
        }
        <RiAttachment2 className="icon" />
      </div>
      <p className="inputError">{!value ? error : null}</p>
    </div>
  )
}

export default UploadField
