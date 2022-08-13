import React,{ FC,useState,useEffect, useRef } from 'react';
import {BsChevronDown, BsChevronUp} from 'react-icons/bs';
import IconInput from '../IconInput';
import './SelectField.css';

export interface Option {
  value: string,
  label?: string // incase its not provided, we render the actual value
}

interface Props {
  onChange: (value:string) => void,
  showSearch?: boolean,
  placeholder?: string,
  className?: string,
  data: Option[],
  value?: any,
  error?: string,
  label?: string,
}

const SelectField:FC<Props> = ({ error,value,label,onChange,data,placeholder,className,showSearch = false }) => {
  const [ customData,setCustomData ] = useState<Option[]>([])
  const [ showModal,setModal ] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement | null>(null)
  const [ localValue,setValue ] = useState<string>()
  const [ query,setQuery ] = useState<string>()
  //
  useEffect(()=>{
    if(value){
      /**
       * when the valued is updated,
       * it find the corresponding value
       * in the data, and sets it label
       */
      for(const one of data){
        if(one.value.includes(value) || one.label?.includes(value)){
          setValue(one.label || one.value)
        }
      }
    }else{
      setValue('')
    }
  },[value,data])

  useEffect(()=>{
    // clicke event that's incharge of 
    // closing the modal
    document.addEventListener('click', (e:any) => {
      if(e.target && e.target.contains(selectRef.current)){
        setModal(false)
      }
    })

    return () => {
      // clear the event
      document.removeEventListener('click', () => {
        setModal(false)
      })
    }
  },[])

  useEffect(()=>{
    if(query){
      const newData = data.filter(({ value }) => String(value).toLowerCase().includes(query.toLowerCase()) )
      setCustomData(newData)
    }else{
      setCustomData(data)
    }
  },[query,data])

  const toggleModal = () => {
    if(!showModal){
      //set top
      if(selectRef.current){
        const { top } =  selectRef.current.getBoundingClientRect();
        // 20% from the top
        if(Number(top / window.innerHeight * 100) > 20 && data.length > 10 ){
          selectRef.current.classList.add('onTop')
        }else if(selectRef.current.classList.contains('onTop')){
          selectRef.current.classList.remove('onTop')
        }
      }
    }
    setModal( prev => !prev)
  }

  const handleChange = (value:string,label?:string) => {
    onChange(value)
    setValue(label||value)
    toggleModal()
  }

  return (
    <div className={"SelectField "+className} ref={selectRef}>
      { label ? <label>{label}</label> : null}
      <div className="values" onClick={toggleModal}>
        {
          localValue ?
            <p className="value">{localValue}</p> :
            <p className="text-gray-400" >{placeholder || "Choose"}</p>  
        }
        {
          showModal ?
            <BsChevronUp className="toggleIcon" />:
            <BsChevronDown className="toggleIcon" />
        }
      </div>
      {
        showModal &&
        <div className="Label-Modal" >
          {
            showSearch &&
            <IconInput
              value={query}
              style={{padding:0}}
              placeholder="Search"
              onChange={val => setQuery(val)}
            />
          }
          <div className="choices">
            { // creating unique keys
              React.Children.toArray(
                customData.map(({ value,label }) => 
                  <p 
                    className="choice" 
                    onClick={() => handleChange(value,label)} 
                  >
                    {label || value}
                  </p>  
                )
              )
            }
          </div>
        </div>
      }
      <p className='inputError'>{ !localValue ? error : null}</p>
    </div>
  )
}

export default SelectField
