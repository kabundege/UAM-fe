import { FC, memo, useEffect, useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoImageOutline } from 'react-icons/io5'
import useLoading from '../../hooks/useLoading'
import './ImagePicker.css'

export interface Props {
  onChange: (value:{}) => void,
  label: string,
  value?: any,
  placeholder: string,
  required?: boolean,
  error?: any,
  ContainerClassName?: string,
  ClassName?: string
}

const ImagePicker:FC<Props> = ({ value,onChange,label,placeholder,error, ContainerClassName="", ClassName="" }) => {
  const { isLoading } = useLoading()
  const InputRef = useRef<HTMLInputElement|null>(null)
  const [ localValue,setLocalValue ] = useState<string>()

  useEffect(()=>{
    if(value && value.name){
      setLocalValue(URL.createObjectURL(value))
    }
    else if (value || typeof(value) === "string"){
      setLocalValue(value)
      // eslint-disable-next-line
      // load(GetDownloaSignedUrls(value))
      // .then(res => {
      //     const { url } = res.data as any
      //     // ImgRef.current.src = url
      //     setLocalValue(url)
      // })
    }
    else{
      setLocalValue('')
    }
    // eslint-disable-next-line
  },[value])

  const onClickHandler = () => {
    if(InputRef.current)
    InputRef.current.click()
  }

  return (
    <div className={'ImagePicker ' + ContainerClassName}>
      <label className="capitalize">{label}</label>
      <div className={'InputWrapper '+ClassName} onClick={onClickHandler}>
        <input
          type='file'
          ref={InputRef}
          accept="image/*"
          onChange={(e) => {
            if(e.currentTarget.files && e.currentTarget.files[0]){
              onChange(e.currentTarget.files[0])
            }
          }}
        />
        {
          isLoading ?
            <AiOutlineLoading3Quarters className="animate-spin text-blue-600" />:
            localValue ?
              <img src={localValue} alt="" />:
              <>
                <IoImageOutline className="icon" />
                <span>{placeholder}</span>
              </>

        }
        
      </div>
      <p className="inputError" >{ !localValue ? error : null}</p>
    </div>
  )
}

export default memo(ImagePicker)
