import React, { FormEvent, useContext, useState } from 'react'
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import useLoading from '../../hooks/useLoading';
import VerificationInput from 'react-input-verification-code';
import Welcome from '../Welcome';
import { VerificationApi } from '../../API/auth.service';
import { StoreContext } from '../../context';

export default function Verification() {
  const { isLoading,error,load } = useLoading(false)
  const { user,handleContext } = useContext(StoreContext)
  const [ code,setCode ] = useState('')
  const navigation = useNavigate()

  const submitHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // navigation('')
    load(VerificationApi(code))
    .then((res) => {
      handleContext(
        'user',
        res.data.user,
        ()=>{
          navigation('/profile')
        }
      )
    })
  }

  return (
    <Welcome>
      <form className='flex flex-col  px-20' onSubmit={submitHandler}>
        <h1 className="text-4xl text-center font-bold text-primary opacity-20 my-10">Verification</h1>
        <p className="text-xl my-10 text-center text-gray-500">We have send a {user?.status ? 'verification' : null} code to your email {user?.email || 'abcde***@mail.com'}</p>
        <VerificationInput autoFocus length={6} value={code} onChange={val => setCode(val)} />
          {
            error ?
              <p className='error mt-5' >{error}</p> :
              <div className="spacer" />
          }
        <Button 
          text='Continue' 
          className="w-auto" 
          isLoading={isLoading} 
        />
      </form>
    </Welcome>
  )
}
