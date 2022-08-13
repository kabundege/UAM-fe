import React, { FormEvent, useState } from 'react'
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import useLoading from '../../../hooks/useLoading';
import VerificationInput from 'react-input-verification-code';

export default function Verification() {
  const { isLoading,error } = useLoading(false)
  const [ code,setCode ] = useState('')
  const navigation = useNavigate() 


  const submitHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigation('')
  }

  return (
    <form className='flex flex-col  px-20' onSubmit={submitHandler}>
      <h1 className="text-4xl text-center font-bold text-primary opacity-20 my-10">Verification</h1>
      <p className="text-xl my-10 text-center text-gray-500">We have send a verification code to your email john***@gmail.com</p>
      <VerificationInput autoFocus length={6} value={code} onChange={val => setCode(val)} />
      {
        error ?
          <p className='error' >{error}</p> :
          <div className="spacer" />
      }
      <Button 
        text='Continue' 
        className="w-auto" 
        isLoading={isLoading} 
      />
    </form>
  )
}
